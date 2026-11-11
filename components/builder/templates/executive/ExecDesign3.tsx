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

const ExecDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#4f46e5";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const headerBg = withAlpha(accent, 0.07);
  const tint = withAlpha(accent, 0.1);
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

  const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);

  // Heading: accent square + bold title (+ optional rule)
  const Title = ({ children, rule = false }: { children: React.ReactNode; rule?: boolean }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px", whiteSpace: "normal" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: accent, display: "inline-block", flexShrink: 0, ...printColors }} />
      <h2 style={{ fontSize: "13.5px", fontWeight: 800, color: ink, letterSpacing: "-0.1px", margin: 0, flexShrink: 0 }}>{children}</h2>
      {rule && <div style={{ flex: 1, height: "1px", backgroundColor: hairline, ...printColors }} />}
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER: soft tinted band, centered */}
      <div
        style={{
          textAlign: "center",
          padding: "52px 60px 32px 60px",
          backgroundColor: headerBg,
          borderBottom: `3px solid ${accent}`,
          ...printColors,
        }}
      >
        <h1 style={{ fontSize: "46px", fontWeight: 300, color: ink, letterSpacing: "-1.2px", lineHeight: 1.05, margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ width: "50px", height: "3px", backgroundColor: accent, margin: "18px auto 14px auto", borderRadius: "2px", ...printColors }} />
        <p style={{ color: accent, letterSpacing: "2.5px", fontSize: "12px", fontWeight: 700, margin: 0 }}>{personal.jobTitle}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            rowGap: "4px",
            marginTop: "18px",
            fontSize: "10.5px",
            color: body,
            whiteSpace: "normal",
          }}
        >
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ width: "1px", height: "11px", backgroundColor: tintBorder, margin: "0 14px", display: "inline-block", ...printColors }} />}
              {c}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "stretch", padding: "38px 56px 50px 56px", gap: "34px" }}>
        {/* SIDEBAR */}
        <div style={{ width: "205px", flexShrink: 0, paddingRight: "28px", borderRight: `1px solid ${hairline}` }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <Title>Skills</Title>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 600,
                      color: accent,
                      backgroundColor: tint,
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

          {education.length > 0 && (
            <div>
              <Title>Education</Title>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "14px", fontSize: "10.5px", ...noBreak }}>
                  <div style={{ fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                  <div style={{ color: body, marginTop: "2px" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 🚀 SUMMARY */}
          {personal.summary && (
            <div style={{ marginBottom: "30px", ...noBreak }}>
              <Title rule>Summary</Title>
              <p style={{ fontSize: "11.5px", lineHeight: "1.8", color: body, margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          <Title rule>Experience</Title>
          {experience.map(exp => (
            <div
              key={exp._id}
              style={{
                marginBottom: "18px",
                padding: "14px 18px",
                border: `1px solid ${hairline}`,
                borderLeft: `3px solid ${accent}`,
                borderRadius: "10px",
                ...noBreak,
                ...printColors,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ fontWeight: 700, fontSize: "13px", color: ink }}>{exp.position}</div>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: accent,
                    backgroundColor: tint,
                    padding: "2px 9px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    ...printColors,
                  }}
                >
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: accent, fontWeight: 600, margin: "3px 0 8px 0" }}>{exp.company}</div>
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

          {projects && projects.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <Title rule>Projects</Title>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
                {projects.map(proj => (
                  <div
                    key={proj._id}
                    style={{
                      padding: "12px 14px",
                      backgroundColor: "#f8fafc",
                      border: `1px solid ${hairline}`,
                      borderRadius: "10px",
                      ...noBreak,
                      ...printColors,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "11.5px", color: ink }}>{proj.name}</div>
                    {proj.description && (
                      <div style={{ fontSize: "10px", color: body, lineHeight: "1.6", marginTop: "3px" }}>{proj.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <Title rule>Certifications</Title>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "9px", fontSize: "10.5px", ...noBreak }}>
                  <div style={{ fontWeight: 700, color: ink }}>{cert.name}</div>
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
ExecDesign3.displayName = "ExecDesign3";
export default ExecDesign3;