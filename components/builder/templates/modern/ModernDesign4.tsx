"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#db2777";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#64748b";
  const hairline = "#e2e8f0";
  const card = "#f8fafc";
  const tint = `${accent}14`;

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

  // Section heading: accent dot + bold title
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", whiteSpace: "normal" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: accent, display: "inline-block", flexShrink: 0, ...printColors }} />
      <h2 style={{ fontSize: "14px", fontWeight: 800, color: ink, letterSpacing: "-0.1px", margin: 0 }}>{children}</h2>
    </div>
  );

  const sideCard = {
    backgroundColor: card,
    border: `1px solid ${hairline}`,
    padding: "22px 22px",
    borderRadius: "14px",
    ...printColors,
  };

  const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);

  return (
    <div
      ref={ref}
      style={{
        padding: "0",
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
      <div style={{ backgroundColor: accent, padding: "50px 50px 38px 50px", color: "#ffffff", ...printColors }}>
        <h1 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1.2px", lineHeight: 1.02, margin: 0 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "16px", marginTop: "10px", fontWeight: 500, color: "rgba(255,255,255,0.92)", letterSpacing: "0.3px" }}>
          {personal.jobTitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px", whiteSpace: "normal" }}>
          {contacts.map((c, i) => (
            <span
              key={i}
              style={{
                fontSize: "10.5px",
                fontWeight: 500,
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.28)",
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

      <div style={{ padding: "36px 50px 50px 50px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "32px", ...noBreak }}>
            <p style={{ fontSize: "12.5px", lineHeight: "1.8", color: ink, margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "34px", alignItems: "flex-start" }}>
          {/* MAIN COLUMN */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: "30px" }}>
                <SectionTitle>Experience</SectionTitle>
                {experience.map(exp => (
                  <div
                    key={exp._id}
                    style={{ marginBottom: "22px", borderLeft: `2px solid ${accent}`, paddingLeft: "16px", ...noBreak, ...printColors }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: 700, color: ink }}>{exp.position}</div>
                    <div style={{ fontSize: "11px", color: accent, fontWeight: 700, margin: "2px 0 4px 0" }}>{exp.company}</div>
                    <div style={{ fontSize: "9.5px", color: muted, marginBottom: "8px", fontWeight: 600 }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.65" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ display: "flex", gap: "9px", marginBottom: "3px" }}>
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
                      padding: "12px 15px",
                      backgroundColor: tint,
                      borderRadius: "10px",
                      ...noBreak,
                      ...printColors,
                    }}
                  >
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{proj.name}</div>
                    {proj.description && (
                      <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.6", marginTop: "3px" }}>{proj.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDE COLUMN */}
          <div style={{ width: "240px", flexShrink: 0 }}>
            {skills.length > 0 && (
              <div style={{ ...sideCard, marginBottom: "20px" }}>
                <SectionTitle>Skills</SectionTitle>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "13px", ...noBreak }}>
                    <div style={{ fontSize: "10.5px", fontWeight: 700, color: accent, marginBottom: "5px" }}>{s.category}</div>
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

            {education.length > 0 && (
              <div style={{ ...sideCard, marginBottom: "20px" }}>
                <SectionTitle>Education</SectionTitle>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                    <div style={{ fontSize: "10px", color: muted, marginTop: "2px" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div style={sideCard}>
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
    </div>
  );
});
ModernDesign4.displayName = "ModernDesign4";
export default ModernDesign4;