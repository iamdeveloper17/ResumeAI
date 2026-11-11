"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#ea580c";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#64748b";
  const faint = "#94a3b8";
  const hairline = "#e2e8f0";
  const tint = `${accent}14`;
  const tintStrong = `${accent}1f`;

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

  // Section heading: soft accent tag
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "14px", whiteSpace: "normal" }}>
      <h2
        style={{
          display: "inline-block",
          fontSize: "11.5px",
          fontWeight: 800,
          color: accent,
          backgroundColor: tint,
          padding: "4px 12px",
          borderRadius: "999px",
          letterSpacing: "0.2px",
          margin: 0,
          ...printColors,
        }}
      >
        {children}
      </h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "50px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `1px solid ${hairline}`,
          paddingBottom: "24px",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ fontSize: "38px", fontWeight: 800, color: ink, letterSpacing: "-1.1px", lineHeight: 1.05, margin: 0 }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "15px", color: accent, fontWeight: 600, letterSpacing: "0.3px", marginTop: "8px" }}>
            {personal.jobTitle}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "10.5px", color: muted, textAlign: "right", lineHeight: 1.5 }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        {/* accent segment on the rule */}
        <div style={{ position: "absolute", left: 0, bottom: "-2px", width: "90px", height: "3px", borderRadius: "2px", backgroundColor: accent, ...printColors }} />
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "30px", ...noBreak }}>
          <p style={{ fontSize: "12.5px", lineHeight: "1.8", color: ink, margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0" }}>
        {/* LEFT COLUMN */}
        <div style={{ paddingRight: "26px" }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "20px", ...noBreak }}>
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{exp.position}</div>
                  <div style={{ fontSize: "10.5px", color: accent, fontWeight: 700, margin: "2px 0 3px 0" }}>{exp.company}</div>
                  <div style={{ fontSize: "9px", color: faint, fontWeight: 600, marginBottom: "7px" }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10px", color: body, lineHeight: "1.65" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "3px" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, marginTop: "7px", flexShrink: 0, ...printColors }} />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: ink }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10px", color: body, lineHeight: "1.6", marginTop: "2px" }}>{proj.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ paddingLeft: "26px", borderLeft: `1px solid ${hairline}` }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle>Skills</SectionTitle>
              {skills.map(s => (
                <div key={s._id} style={{ marginBottom: "12px", ...noBreak }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: ink, marginBottom: "5px" }}>{s.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {s.items.map((i, idx) => (
                      <span
                        key={`${i.name}-${idx}`}
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          color: body,
                          backgroundColor: "#f8fafc",
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

          {education.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "15px", ...noBreak }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "9px", color: faint, fontWeight: 600, marginTop: "2px" }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", ...noBreak }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ModernDesign5.displayName = "ModernDesign5";
export default ModernDesign5;