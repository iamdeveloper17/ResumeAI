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

const CreativeDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  // 🚀 Saare fields destructure karo
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0891b2";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const sidebarBg = "#f5f8fb";
  const tint = withAlpha(accent, 0.1);
  const tintBorder = withAlpha(accent, 0.28);

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

  const displayName = personal.fullName || "Robert Anderson";
  const displayTitle = personal.jobTitle || "Business Development Manager";

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
    { label: "Location", value: personal.location },
    { label: "Website", value: personal.website },
    { label: "LinkedIn", value: personal.linkedin },
    { label: "GitHub", value: personal.github },
  ].filter(c => c.value);

  // Kept from the original (not used in the layout, available if skill levels are added later)
  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "10px", fontWeight: 700, marginBottom: "4px", color: ink }}>{name}</div>
      <div style={{ width: "100%", height: "6px", backgroundColor: hairline, borderRadius: "3px", overflow: "hidden", ...printColors }}>
        <div style={{ width: `${level}%`, height: "100%", backgroundColor: accent, borderRadius: "3px", ...printColors }} />
      </div>
    </div>
  );
  void SkillBar;

  // Sidebar heading
  const SideTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "13px", whiteSpace: "normal" }}>
      <span style={{ width: "4px", height: "15px", borderRadius: "2px", backgroundColor: accent, display: "inline-block", ...printColors }} />
      <h2 style={{ fontSize: "12.5px", fontWeight: 800, color: ink, margin: 0 }}>{title}</h2>
    </div>
  );

  // Main heading
  const MainTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", marginTop: "30px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "15px", fontWeight: 800, color: ink, letterSpacing: "-0.2px", margin: 0, flexShrink: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: hairline, ...printColors }} />
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "stretch",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: body,
        ...printColors,
        ...textBreakStyle, // 🚀 Apply kiya
      }}
    >
      {/* 🚀 LEFT SIDEBAR 🚀 */}
      <div
        style={{
          width: "262px",
          flexShrink: 0,
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${hairline}`,
          padding: "0 26px 44px 26px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          ...printColors,
        }}
      >
        {/* Accent cap + photo */}
        <div style={{ margin: "0 -26px", height: "112px", backgroundColor: accent, ...printColors }} />
        <div style={{ marginTop: "-98px", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "158px",
              height: "158px",
              borderRadius: "50%",
              padding: "5px",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
              ...printColors,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${accent}`,
                boxSizing: "border-box",
                backgroundColor: tint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...printColors,
              }}
            >
              {personal.photoUrl ? (
                <img src={personal.photoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : initials ? (
                <span style={{ fontSize: "46px", fontWeight: 800, color: accent, letterSpacing: "1px" }}>{initials}</span>
              ) : (
                <span style={{ fontSize: "40px", color: "#cbd5e1" }}>👤</span>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {contactItems.length > 0 && (
          <div>
            <SideTitle title="Contact" />
            {contactItems.map(c => (
              <div key={c.label} style={{ marginBottom: "11px" }}>
                <div style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.8px", color: accent }}>{c.label}</div>
                <div style={{ fontSize: "10.5px", color: ink, lineHeight: 1.45, marginTop: "1px" }}>{c.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
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
                    color: ink,
                    backgroundColor: "#ffffff",
                    border: `1px solid ${hairline}`,
                    borderLeft: `3px solid ${accent}`,
                    padding: "3px 9px",
                    borderRadius: "6px",
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

        {/* 🚀 CERTIFICATIONS (Real Data) 🚀 */}
        {certifications && certifications.length > 0 && (
          <div>
            <SideTitle title="Certifications" />
            {certifications.map(cert => (
              <div key={cert._id} style={{ marginBottom: "11px", ...noBreak }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: ink, lineHeight: 1.35 }}>{cert.name}</div>
                <div style={{ fontSize: "10px", color: body, marginTop: "1px" }}>
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🚀 RIGHT MAIN CONTENT 🚀 */}
      <div style={{ flex: 1, minWidth: 0, padding: "0 44px 44px 40px" }}>
        {/* Top accent edge + name */}
        <div style={{ margin: "0 -44px 0 -40px", height: "6px", backgroundColor: accent, ...printColors }} />
        <div style={{ padding: "42px 0 6px 0" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: ink, lineHeight: 1.02, letterSpacing: "-1.6px", margin: 0 }}>
            {displayName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <div style={{ width: "34px", height: "3px", borderRadius: "2px", backgroundColor: accent, ...printColors }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "1.2px", margin: 0 }}>{displayTitle}</p>
          </div>
        </div>

        {personal.summary && (
          <div style={{ ...noBreak }}>
            <MainTitle title="Professional Profile" />
            <p style={{ fontSize: "12px", lineHeight: "1.85", color: body, margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <MainTitle title="Work Experience" />
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

        {education.length > 0 && (
          <div>
            <MainTitle title="Education" />
            {education.map(edu => (
              <div
                key={edu._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                  padding: "12px 16px",
                  backgroundColor: sidebarBg,
                  border: `1px solid ${hairline}`,
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: "0 10px 10px 0",
                  ...noBreak,
                  ...printColors,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: ink, margin: 0 }}>
                    {edu.degree} {edu.field}
                  </h3>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: accent, margin: "2px 0 0 0" }}>{edu.institution}</p>
                </div>
                <div style={{ fontSize: "9.5px", fontWeight: 700, color: muted, whiteSpace: "nowrap", paddingTop: "2px" }}>
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🚀 PROJECTS (Real Data) 🚀 */}
        {projects && projects.length > 0 && (
          <div>
            <MainTitle title="Projects" />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
              {projects.map(proj => (
                <div
                  key={proj._id}
                  style={{
                    padding: "13px 15px",
                    backgroundColor: "#ffffff",
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

CreativeDesign4.displayName = "CreativeDesign4";
export default CreativeDesign4;