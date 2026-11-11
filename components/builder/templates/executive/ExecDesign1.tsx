"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

  const ink = "#0F172A";
  const body = "#334155";
  const muted = "#94a3b8";
  const mutedText = "#64748b"; // readable grey for small text (muted is for decoration)
  const hairline = "#e2e8f0";
  const paper = "#FFFEFB";

  const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";
  const display = "'Instrument Serif', Georgia, serif";

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

  // Contact items: only the ones that exist, joined with a centre dot
  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
    personal.github,
  ].filter(Boolean);

  const SectionTitle = ({ children }: { children: string }) => (
    <div style={{ textAlign: "center", margin: "0 0 22px 0", ...noBreak }}>
      <h2
        style={{
          fontSize: "10.5px",
          fontWeight: 800,
          letterSpacing: "2.8px",
          textTransform: "uppercase" as const,
          color: accent,
          margin: 0,
          display: "inline-block",
          position: "relative",
          paddingBottom: "10px",
          fontFamily: sans,
        }}
      >
        {children}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "36px",
            height: "1.5px",
            backgroundColor: accent,
            ...printColors,
          }}
        />
      </h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: paper,
        color: ink,
        fontFamily: data.fontFamily || "'Newsreader', 'Instrument Serif', Georgia, serif",
        fontSize: data.fontSize || "11px",
        lineHeight: 1.6,
        ...textBreakStyle,
        ...printColors,
      }}
    >
      <div style={{ height: "4px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "44px 56px 28px 56px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: accent,
            textTransform: "uppercase" as const,
            letterSpacing: "3.2px",
            lineHeight: 1.05,
            margin: 0,
            fontFamily: display,
          }}
        >
          {personal.fullName}
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginTop: "14px" }}>
          <div style={{ height: "1px", width: "28px", backgroundColor: hairline, ...printColors }} />
          <p
            style={{
              fontSize: "11.5px",
              fontWeight: 600,
              color: body,
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              margin: 0,
              fontFamily: sans,
            }}
          >
            {personal.jobTitle}
          </p>
          <div style={{ height: "1px", width: "28px", backgroundColor: hairline, ...printColors }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            rowGap: "4px",
            marginTop: "16px",
            fontSize: "10px",
            color: mutedText,
            fontFamily: sans,
            whiteSpace: "normal",
          }}
        >
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ color: accent, padding: "0 4px", opacity: 0.7 }}>·</span>}
              <span style={{ padding: "0 8px" }}>{c}</span>
            </span>
          ))}
        </div>
      </div>

      {/* BODY (grows so the footer always sits at the bottom of the page) */}
      <div style={{ flex: 1, padding: "0 56px 40px 56px", display: "flex", flexDirection: "column", gap: "34px" }}>
        {personal.summary && (
          <div style={{ ...noBreak, textAlign: "center", maxWidth: "85%", margin: "0 auto" }}>
            <SectionTitle>Executive Summary</SectionTitle>
            <p
              style={{
                fontSize: "12.5px",
                lineHeight: 1.85,
                color: body,
                textAlign: "center",
                margin: 0,
                fontFamily: "'Newsreader', Georgia, serif",
                fontStyle: "italic" as const,
              }}
            >
              {personal.summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <SectionTitle>Professional Experience</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {experience.map((exp) => (
                <div key={exp._id} style={{ ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 700, color: ink }}>{exp.position}</div>
                    <div
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 700,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase" as const,
                        color: mutedText,
                        border: `1px solid ${hairline}`,
                        padding: "3px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#ffffff",
                        whiteSpace: "nowrap",
                        fontFamily: sans,
                        ...printColors,
                      }}
                    >
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: accent,
                      marginTop: "3px",
                      letterSpacing: "0.3px",
                      textTransform: "uppercase" as const,
                      fontFamily: sans,
                    }}
                  >
                    {exp.company}
                  </div>
                  <ul style={{ paddingLeft: "0", margin: "10px 0 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", fontSize: "11px", color: body, lineHeight: 1.65 }}>
                        <span style={{ color: accent, opacity: 0.55, flexShrink: 0 }}>—</span>
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
            <SectionTitle>Education</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "16px" }}>
              {education.map((edu) => (
                <div key={edu._id} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: "14px", ...noBreak, ...printColors }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: ink }}>
                    {edu.degree} {edu.field && <span style={{ fontWeight: 400, color: body }}>in {edu.field}</span>}
                  </div>
                  <div style={{ fontSize: "11px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "9.5px", color: mutedText, marginTop: "3px", display: "flex", gap: "6px", fontFamily: sans }}>
                    <span>{edu.startDate} — {edu.endDate}</span>
                    {edu.grade && (
                      <>
                        <span>·</span>
                        <span style={{ fontWeight: 600, color: accent }}>{edu.grade}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <SectionTitle>Core Competencies</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "92%", margin: "0 auto" }}>
              {skills.map((s) => (
                <div key={s._id} style={{ display: "flex", gap: "16px", fontSize: "11px", lineHeight: 1.6, ...noBreak }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      textTransform: "uppercase" as const,
                      color: accent,
                      width: "120px",
                      flexShrink: 0,
                      textAlign: "right",
                      paddingTop: "1px",
                      fontFamily: sans,
                    }}
                  >
                    {s.category}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, color: body, borderLeft: `1px solid ${hairline}`, paddingLeft: "16px" }}>
                    {s.items.map((i) => i.name).join("  ·  ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <SectionTitle>Selected Projects</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  style={{
                    backgroundColor: "#ffffff",
                    border: `1px solid ${hairline}`,
                    borderTop: `3px solid ${accent}`,
                    borderRadius: "10px",
                    padding: "14px 16px",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 700, color: ink }}>{proj.name}</div>
                  {proj.link && (
                    <div style={{ fontSize: "9px", color: accent, marginTop: "2px", fontFamily: sans }}>{proj.link}</div>
                  )}
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, marginTop: "4px", lineHeight: 1.6 }}>{proj.description}</div>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase" as const,
                        color: mutedText,
                        marginTop: "8px",
                        fontFamily: sans,
                      }}
                    >
                      {proj.techStack.join("  ·  ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <SectionTitle>Certifications</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {certifications.map((cert) => (
                <div
                  key={cert._id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    border: `1px solid ${hairline}`,
                    borderRadius: "999px",
                    padding: "6px 14px",
                    backgroundColor: "#ffffff",
                    ...noBreak,
                    ...printColors,
                  }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0, ...printColors }} />
                  <span style={{ fontSize: "10.5px", fontWeight: 700, color: ink }}>{cert.name}</span>
                  <span style={{ fontSize: "10px", color: mutedText }}>
                    — {cert.issuer} {cert.date && `· ${cert.date}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ margin: "0 56px", height: "1px", backgroundColor: hairline, ...printColors }} />
      <div
        style={{
          padding: "12px 56px",
          textAlign: "center",
          fontSize: "8px",
          letterSpacing: "2px",
          textTransform: "uppercase" as const,
          color: muted,
          fontFamily: sans,
        }}
      >
        Confidential Executive Resume
      </div>
    </div>
  );
});
ExecDesign1.displayName = "ExecDesign1";
export default ExecDesign1;