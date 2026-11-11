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

const CreativeDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e40af";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const onAccent = "#ffffff";
  const onAccentSoft = "rgba(255,255,255,0.78)";
  const onAccentFaint = "rgba(255,255,255,0.16)";
  const tint = withAlpha(accent, 0.09);
  const tintBorder = withAlpha(accent, 0.28);

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

  const displayName = personal.fullName || "Kathy Alvarez";
  const displayTitle = personal.jobTitle || "Creative Designer";

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
  ].filter(c => c.value);

  // Skill bar (keeps the original name/level API; level is clamped so bad data can't break the layout)
  const SkillBar = ({ name, level }: { name: string; level: number }) => {
    const pct = Math.max(0, Math.min(100, Number(level) || 0));
    return (
      <div style={{ ...noBreak }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", fontSize: "10px", fontWeight: 700, marginBottom: "5px", color: ink }}>
          <span style={{ minWidth: 0 }}>{name}</span>
          <span style={{ color: accent, fontSize: "9px", fontWeight: 700 }}>{pct}%</span>
        </div>
        <div style={{ width: "100%", height: "5px", backgroundColor: hairline, borderRadius: "999px", overflow: "hidden", ...printColors }}>
          <div style={{ width: `${pct}%`, height: "100%", backgroundColor: accent, borderRadius: "999px", ...printColors }} />
        </div>
      </div>
    );
  };

  // Sidebar heading
  const SideTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "12.5px", fontWeight: 800, color: onAccent, letterSpacing: "0.4px", margin: 0, flexShrink: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: onAccentFaint, ...printColors }} />
    </div>
  );

  // Main heading
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
        display: "flex",
        alignItems: "stretch",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: body,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* 🚀 LEFT SIDEBAR 🚀 */}
      <div
        style={{
          width: "270px",
          flexShrink: 0,
          backgroundColor: accent,
          color: onAccent,
          padding: "46px 28px 44px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          ...printColors,
        }}
      >
        {/* Profile Photo (circle with soft outer ring) */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "184px",
              height: "184px",
              borderRadius: "50%",
              padding: "8px",
              boxSizing: "border-box",
              border: `2px solid ${onAccentFaint}`,
              ...printColors,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #ffffff", // White border
                boxSizing: "border-box",
                backgroundColor: onAccentFaint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...printColors,
              }}
            >
              {personal.photoUrl ? (
                <img
                  src={personal.photoUrl}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
                />
              ) : initials ? (
                <span style={{ color: onAccent, fontSize: "56px", fontWeight: 800, letterSpacing: "2px" }}>{initials}</span>
              ) : (
                <span style={{ color: onAccent, fontSize: "50px" }}>👤</span>
              )}
            </div>
          </div>
        </div>

        {/* Contact */}
        {contactItems.length > 0 && (
          <div>
            <SideTitle title="Contact" />
            {contactItems.map(c => (
              <div key={c.label} style={{ marginBottom: "11px" }}>
                <div style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.8px", color: onAccentSoft, opacity: 0.8 }}>{c.label}</div>
                <div style={{ fontSize: "10.5px", color: onAccent, lineHeight: 1.45, marginTop: "1px" }}>{c.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education (Sidebar) */}
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

        {/* Expertise / Skills (Sidebar) */}
        {skills.length > 0 && (
          <div>
            <SideTitle title="Expertise" />
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
      </div>

      {/* 🚀 RIGHT MAIN CONTENT 🚀 */}
      <div style={{ flex: 1, minWidth: 0, padding: "50px 44px 44px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: ink, lineHeight: 1.02, letterSpacing: "-1.6px", margin: 0 }}>
            {displayName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <div style={{ width: "34px", height: "3px", borderRadius: "2px", backgroundColor: accent, ...printColors }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "1.2px", margin: 0 }}>{displayTitle}</p>
          </div>
        </div>

        {/* Profile Summary */}
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
            <p style={{ fontSize: "12px", lineHeight: "1.85", color: ink, margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <MainTitle title="Work Experiences" />
            {experience.map((exp, idx) => (
              <div
                key={exp._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "104px minmax(0, 1fr)",
                  columnGap: "20px",
                  paddingTop: idx === 0 ? 0 : "18px",
                  marginBottom: "18px",
                  borderTop: idx === 0 ? "none" : `1px solid ${hairline}`,
                  ...noBreak,
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: accent,
                      backgroundColor: tint,
                      border: `1px solid ${tintBorder}`,
                      padding: "3px 9px",
                      borderRadius: "999px",
                      lineHeight: 1.4,
                      ...printColors,
                    }}
                  >
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                  <p style={{ fontSize: "11.5px", fontWeight: 600, color: accent, margin: "2px 0 8px 0" }}>{exp.company}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.7" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, marginTop: "8px", flexShrink: 0, ...printColors }} />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills (Right side bar chart style) */}
        {skills.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <MainTitle title="Skills" />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", columnGap: "28px", rowGap: "14px" }}>
              {skills.flatMap(s => s.items).map((item, i) => (
                <SkillBar key={i} name={item.name} level={item.level} />
              ))}
            </div>
          </div>
        )}

        {/* 🚀 PROJECTS (Added) 🚀 */}
        {projects && projects.length > 0 && (
          <div style={{ marginTop: "30px" }}>
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

        {/* 🚀 CERTIFICATIONS 🚀 */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <MainTitle title="Certifications" />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
              {certifications.map(cert => (
                <div
                  key={cert._id}
                  style={{
                    padding: "10px 14px",
                    borderLeft: `3px solid ${accent}`,
                    backgroundColor: "#f8fafc",
                    borderRadius: "0 8px 8px 0",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <h3 style={{ fontSize: "11.5px", fontWeight: 700, color: ink, margin: 0, lineHeight: 1.35 }}>{cert.name}</h3>
                  <p style={{ fontSize: "10px", color: muted, margin: "2px 0 0 0" }}>
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CreativeDesign2.displayName = "CreativeDesign2";
export default CreativeDesign2;