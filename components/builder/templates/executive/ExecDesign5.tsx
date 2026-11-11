"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#2563eb";

  // 🎨 Design tokens (dark executive theme)
  const bg = "#0c1424";
  const panel = "rgba(255,255,255,0.045)";
  const ink = "#f8fafc";
  const body = "#cbd5e1";
  const muted = "#94a3b8";
  const line = "rgba(255,255,255,0.1)";
  const tint = `${accent}26`;

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

  // Section heading: title + hairline to the margin
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "0.4px", margin: 0, flexShrink: 0 }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: line, ...printColors }} />
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: bg,
        color: ink,
        minHeight: "1123px",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        padding: "50px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Top accent edge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "22px", marginBottom: "38px", ...printColors }}>
        <h1 style={{ fontSize: "38px", fontWeight: 800, color: ink, letterSpacing: "-0.8px", lineHeight: 1.05, margin: 0 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "15px", fontWeight: 600, color: accent, letterSpacing: "0.5px", marginTop: "8px" }}>
          {personal.jobTitle}
        </p>
      </div>

      <div style={{ display: "flex", gap: "34px", alignItems: "flex-start" }}>
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width: "215px",
            flexShrink: 0,
            padding: "20px 18px",
            backgroundColor: panel,
            border: `1px solid ${line}`,
            borderRadius: "12px",
            ...printColors,
          }}
        >
          <SectionTitle>Contact</SectionTitle>
          <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.9", marginBottom: "26px" }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
          </div>

          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skills.flatMap(s => s.items).map((i, idx) => (
              <span
                key={`${i.name}-${idx}`}
                style={{
                  fontSize: "9.5px",
                  fontWeight: 600,
                  color: ink,
                  backgroundColor: tint,
                  border: `1px solid ${accent}55`,
                  padding: "3px 9px",
                  borderRadius: "999px",
                  lineHeight: "1.5",
                  ...printColors,
                }}
              >
                {i.name}
              </span>
            ))}
          </div>

          {certifications && certifications.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "11px", ...noBreak }}>
                  <div style={{ fontSize: "10.5px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: "9.5px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 🚀 SUMMARY */}
          {personal.summary && (
            <div style={{ marginBottom: "30px", ...noBreak }}>
              <SectionTitle>Summary</SectionTitle>
              <p style={{ fontSize: "11.5px", color: body, lineHeight: "1.75", margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          <SectionTitle>Experience</SectionTitle>
          {experience.map(exp => (
            <div
              key={exp._id}
              style={{ marginBottom: "22px", paddingLeft: "14px", borderLeft: `2px solid ${accent}`, ...noBreak, ...printColors }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
              <div style={{ fontSize: "11px", color: accent, fontWeight: 700, margin: "2px 0 8px 0" }}>{exp.company}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: body, lineHeight: "1.65", fontSize: "10.5px" }}>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: "9px", marginBottom: "3px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "1px", backgroundColor: accent, marginTop: "7px", flexShrink: 0, ...printColors }} />
                    <span style={{ minWidth: 0 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {education.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: ink }}>{edu.degree}</div>
                  <div style={{ fontSize: "10.5px", color: muted, marginTop: "2px" }}>
                    {edu.institution} | {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div
                  key={proj._id}
                  style={{
                    marginBottom: "12px",
                    padding: "11px 14px",
                    backgroundColor: panel,
                    border: `1px solid ${line}`,
                    borderRadius: "10px",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: accent }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.6", marginTop: "3px" }}>{proj.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ExecDesign5.displayName = "ExecDesign5";
export default ExecDesign5;