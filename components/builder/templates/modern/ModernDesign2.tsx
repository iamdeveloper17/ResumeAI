"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#4f46e5";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#334155";
  const muted = "#64748b";
  const hairline = "#e2e8f0";
  const tint = `${accent}12`; // soft accent background (~7% alpha)
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

  // Section heading: small accent block + title
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", whiteSpace: "normal" }}>
      <span style={{ width: "4px", height: "16px", borderRadius: "2px", backgroundColor: accent, display: "inline-block", ...printColors }} />
      <h2 style={{ fontSize: "14px", fontWeight: 800, color: ink, letterSpacing: "-0.2px", margin: 0 }}>{children}</h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        padding: "44px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Left edge accent rail */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "10px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "26px",
          paddingBottom: "22px",
          borderBottom: `1px solid ${hairline}`,
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ fontSize: "38px", fontWeight: 900, color: ink, letterSpacing: "-1.2px", lineHeight: 1.05, margin: 0 }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "15px", fontWeight: 600, color: accent, marginTop: "8px", letterSpacing: "0.2px" }}>
            {personal.jobTitle}
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "10px",
            color: muted,
            lineHeight: "1.9",
            paddingLeft: "16px",
            borderLeft: `2px solid ${accent}`,
            ...printColors,
          }}
        >
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "28px", ...noBreak }}>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "1.75",
              color: body,
              margin: 0,
              padding: "14px 18px",
              backgroundColor: tint,
              borderLeft: `4px solid ${accent}`,
              borderRadius: "0 10px 10px 0",
              ...printColors,
            }}
          >
            {personal.summary}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "20px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "9px", fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: accent, fontWeight: 600, margin: "2px 0 8px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.65" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "9px", marginBottom: "4px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: accent, marginTop: "7px", flexShrink: 0, ...printColors }} />
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
                <div
                  key={proj._id}
                  style={{
                    marginBottom: "12px",
                    padding: "11px 14px",
                    border: `1px solid ${hairline}`,
                    borderRadius: "10px",
                    ...noBreak,
                  }}
                >
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.6", marginTop: "3px" }}>{proj.description}</div>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "9.5px", color: muted, fontStyle: "italic", marginTop: "5px" }}>
                      Tech: {proj.techStack.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            width: "225px",
            flexShrink: 0,
            padding: "20px 18px",
            backgroundColor: "#f8fafc",
            border: `1px solid ${hairline}`,
            borderRadius: "14px",
            ...printColors,
          }}
        >
          {skills.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: tintStrong,
                      color: accent,
                      padding: "3px 9px",
                      borderRadius: "999px",
                      fontSize: "9.5px",
                      fontWeight: 700,
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
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "2px" }}>{edu.institution}</div>
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
ModernDesign2.displayName = "ModernDesign2";
export default ModernDesign2;