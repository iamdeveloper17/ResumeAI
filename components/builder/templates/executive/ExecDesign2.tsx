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

const ExecDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0f172a";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const panelBg = "#f5f7fa";
  const tint = withAlpha(accent, 0.08);
  const tintBorder = withAlpha(accent, 0.25);

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

  const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);

  // Main-column heading: large accent numeral-free title with rule
  const MainTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "15px", fontWeight: 800, color: accent, letterSpacing: "-0.2px", margin: 0, flexShrink: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: hairline, ...printColors }} />
    </div>
  );

  // Sidebar heading: small accent bar + title
  const SideTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", whiteSpace: "normal" }}>
      <span style={{ width: "4px", height: "15px", borderRadius: "2px", backgroundColor: accent, display: "inline-block", ...printColors }} />
      <h2 style={{ fontSize: "13px", fontWeight: 800, color: ink, margin: 0 }}>{children}</h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: accent, color: "#fff", padding: "46px 44px 30px 44px", ...printColors }}>
        <h1 style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-1.4px", lineHeight: 1.04, margin: 0 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.85)", marginTop: "9px", letterSpacing: "0.2px" }}>
          {personal.jobTitle}
        </p>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.22)", margin: "22px 0 16px 0", ...printColors }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", whiteSpace: "normal" }}>
          {contacts.map((c, i) => (
            <span
              key={i}
              style={{
                fontSize: "10.5px",
                fontWeight: 500,
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.26)",
                padding: "5px 13px",
                borderRadius: "999px",
                lineHeight: "1.4",
                ...printColors,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 0, padding: "34px 36px 44px 44px" }}>
          {/* 🚀 SUMMARY */}
          {personal.summary && (
            <div style={{ marginBottom: "30px", ...noBreak }}>
              <MainTitle>Summary</MainTitle>
              <p style={{ fontSize: "12px", lineHeight: "1.8", color: body, margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          <MainTitle>Experience</MainTitle>
          <div style={{ paddingLeft: "20px", borderLeft: `2px solid ${hairline}`, marginLeft: "4px" }}>
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
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: ink }}>{exp.position}</div>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
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
                <div style={{ color: accent, fontWeight: 600, fontSize: "11.5px", margin: "3px 0 8px 0" }}>{exp.company}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7", color: body, fontSize: "10.5px" }}>
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <MainTitle>Projects</MainTitle>
              {projects.map(proj => (
                <div
                  key={proj._id}
                  style={{
                    marginBottom: "12px",
                    padding: "12px 16px",
                    backgroundColor: tint,
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: "0 10px 10px 0",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.65", marginTop: "3px" }}>{proj.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: full-height tinted panel */}
        <div style={{ width: "250px", flexShrink: 0, backgroundColor: panelBg, borderLeft: `1px solid ${hairline}`, padding: "34px 28px 44px 28px", ...printColors }}>
          <SideTitle>Education</SideTitle>
          {education.map(edu => (
            <div key={edu._id} style={{ marginBottom: "14px", fontSize: "11px", ...noBreak }}>
              <div style={{ fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
              <div style={{ color: body, marginTop: "2px" }}>{edu.institution}</div>
            </div>
          ))}

          {skills.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <SideTitle>Skills</SideTitle>
              {skills.map(s => (
                <div key={s._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: accent, marginBottom: "5px" }}>{s.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {s.items.map((i, idx) => (
                      <span
                        key={`${i.name}-${idx}`}
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          color: body,
                          backgroundColor: "#ffffff",
                          border: `1px solid ${hairline}`,
                          padding: "2px 9px",
                          borderRadius: "999px",
                          lineHeight: "1.5",
                          ...printColors,
                        }}
                      >
                        {i.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <SideTitle>Certifications</SideTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "11px", fontSize: "11px", ...noBreak }}>
                  <div style={{ fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ExecDesign2.displayName = "ExecDesign2";
export default ExecDesign2;