"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

// Safe alpha helper: works with #rgb and #rrggbb (returns the color itself otherwise)
const withAlpha = (color: string, alpha: number) => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const CreativeDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  // 🚀 Saare fields destructure karo
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const onAccent = "#ffffff";
  const onAccentSoft = "rgba(255,255,255,0.78)";
  const onAccentFaint = "rgba(255,255,255,0.18)";
  const tint = withAlpha(accent, 0.08);
  const tintBorder = withAlpha(accent, 0.25);

  // 🚀 Text break fix
  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  const printColors = {
    WebkitPrintColorAdjust: "exact" as const,
    printColorAdjust: "exact" as const,
  };

  const noBreak = { breakInside: "avoid" as const, pageBreakInside: "avoid" as const };

  const displayName = personal.fullName || "Adeline Palmerston";
  const displayTitle = personal.jobTitle || "Graphic Designer";

  // Initials for the photo fallback
  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  const contactItems = [
    { label: "Phone", value: personal.phone },
    { label: "Email", value: personal.email },
    { label: "Website", value: personal.website },
    { label: "LinkedIn", value: personal.linkedin },
    { label: "GitHub", value: personal.github },
    { label: "Location", value: personal.location },
  ].filter(c => c.value);

  // Sidebar heading (on the accent background)
  const SideTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "12.5px", fontWeight: 800, color: onAccent, letterSpacing: "0.4px", margin: 0, flexShrink: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: onAccentFaint, ...printColors }} />
    </div>
  );

  // Main-column heading
  const MainTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", whiteSpace: "normal" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: accent, display: "inline-block", flexShrink: 0, ...printColors }} />
      <h2 style={{ fontSize: "15px", fontWeight: 800, color: ink, letterSpacing: "-0.2px", margin: 0, flexShrink: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: hairline, ...printColors }} />
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: body,
        ...printColors,
        ...textBreakStyle, // 🚀 Apply kiya
      }}
    >
      {/* 🚀 LEFT SIDEBAR (photo, contact, skills, education, certifications) 🚀 */}
      <div
        style={{
          width: "268px",
          flexShrink: 0,
          backgroundColor: accent,
          color: onAccent,
          padding: "40px 28px 44px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          ...printColors,
        }}
      >
        {/* PHOTO */}
        <div style={{ position: "relative", margin: "0 auto", width: "196px", height: "236px" }}>
          {/* offset frame */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "-10px",
              bottom: "-10px",
              border: `2px solid ${onAccentFaint}`,
              borderRadius: "22px",
              ...printColors,
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              overflow: "hidden",
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.9)",
              boxSizing: "border-box",
              ...printColors,
            }}
          >
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : initials ? (
              <span style={{ fontSize: "64px", fontWeight: 800, color: onAccent, letterSpacing: "2px" }}>{initials}</span>
            ) : (
              <span style={{ fontSize: "60px", color: "#cbd5e1" }}>👤</span>
            )}
          </div>
        </div>

        {/* CONTACT */}
        {contactItems.length > 0 && (
          <div style={{ marginTop: "6px" }}>
            <SideTitle title="Contact" />
            {contactItems.map(c => (
              <div key={c.label} style={{ marginBottom: "11px" }}>
                <div style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.8px", color: onAccentSoft, opacity: 0.8 }}>{c.label}</div>
                <div style={{ fontSize: "10.5px", color: onAccent, lineHeight: 1.45, marginTop: "1px" }}>{c.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div>
            <SideTitle title="Skills" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.flatMap(s => s.items).map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 600,
                    color: onAccent,
                    backgroundColor: onAccentFaint,
                    border: "1px solid rgba(255,255,255,0.25)",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    lineHeight: "1.5",
                    ...printColors,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div>
            <SideTitle title="Education" />
            {education.map(edu => (
              <div key={edu._id} style={{ marginBottom: "15px", ...noBreak }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: onAccent, lineHeight: 1.35 }}>{edu.degree}</div>
                <div style={{ fontSize: "10.5px", color: onAccentSoft, marginTop: "2px" }}>{edu.institution}</div>
                <div style={{ fontSize: "9.5px", color: onAccentSoft, opacity: 0.75, marginTop: "3px", fontWeight: 600 }}>
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS (Real Data) */}
        {certifications && certifications.length > 0 && (
          <div>
            <SideTitle title="Certifications" />
            {certifications.map(cert => (
              <div key={cert._id} style={{ marginBottom: "11px", ...noBreak }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: onAccent, lineHeight: 1.35 }}>{cert.name}</div>
                <div style={{ fontSize: "10px", color: onAccentSoft, opacity: 0.85, marginTop: "1px" }}>
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🚀 RIGHT CONTENT 🚀 */}
      <div style={{ flex: 1, minWidth: 0, padding: "48px 44px 44px 40px", backgroundColor: "#ffffff" }}>
        {/* NAME + TITLE */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: ink, lineHeight: 1.02, letterSpacing: "-1.6px", margin: 0 }}>
            {displayName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <div style={{ width: "34px", height: "3px", borderRadius: "2px", backgroundColor: accent, ...printColors }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "1.2px", margin: 0 }}>{displayTitle}</p>
          </div>
        </div>

        {/* SUMMARY */}
        {personal.summary && (
          <div
            style={{
              marginBottom: "32px",
              padding: "16px 20px",
              backgroundColor: tint,
              borderLeft: `3px solid ${accent}`,
              borderRadius: "0 12px 12px 0",
              ...noBreak,
              ...printColors,
            }}
          >
            <div style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.8px", color: accent, marginBottom: "6px" }}>About me</div>
            <p style={{ fontSize: "11.5px", lineHeight: "1.8", color: ink, margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <MainTitle title="Experience" />
            <div style={{ marginLeft: "4px", paddingLeft: "20px", borderLeft: `2px solid ${hairline}` }}>
              {experience.map(exp => (
                <div key={exp._id} style={{ position: "relative", marginBottom: "22px", ...noBreak }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "3px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      border: `2.5px solid ${accent}`,
                      ...printColors,
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                    <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        color: accent,
                        backgroundColor: tint,
                        border: `1px solid ${tintBorder}`,
                        padding: "2px 9px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                        ...printColors,
                      }}
                    >
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: "11.5px", fontWeight: 600, color: accent, margin: "3px 0 8px 0" }}>{exp.company}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.7" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, marginTop: "8px", flexShrink: 0, ...printColors }} />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <div>
            <MainTitle title="Projects" />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
              {projects.map(proj => (
                <div
                  key={proj._id}
                  style={{
                    padding: "13px 15px",
                    backgroundColor: "#f8fafc",
                    border: `1px solid ${hairline}`,
                    borderTop: `3px solid ${accent}`,
                    borderRadius: "10px",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <h3 style={{ fontSize: "12px", fontWeight: 700, color: ink, margin: 0 }}>{proj.name}</h3>
                  {proj.link && <div style={{ fontSize: "9px", color: accent, marginTop: "2px" }}>{proj.link}</div>}
                  {proj.description && (
                    <p style={{ fontSize: "10px", color: body, marginTop: "4px", lineHeight: "1.6", marginBottom: 0 }}>{proj.description}</p>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                      {proj.techStack.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "8.5px",
                            fontWeight: 600,
                            color: accent,
                            backgroundColor: tint,
                            padding: "1px 7px",
                            borderRadius: "999px",
                            lineHeight: "1.5",
                            ...printColors,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CreativeDesign3.displayName = "CreativeDesign3";
export default CreativeDesign3;