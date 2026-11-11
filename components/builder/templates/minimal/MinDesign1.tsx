"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#000000";

  // 🎨 Design tokens (quiet, high-whitespace)
  const ink = "#171717";
  const body = "#525252";
  const muted = "#8a8a8a";
  const hairline = "#e7e5e4";

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

  // Minimal heading: small accent title, hairline beneath
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "18px", whiteSpace: "normal" }}>
      <h2
        style={{
          fontSize: "11.5px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          color: accent,
          margin: 0,
          paddingBottom: "9px",
        }}
      >
        {children}
      </h2>
      <div style={{ height: "1px", backgroundColor: hairline, ...printColors }} />
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "60px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: body,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "38px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 300,
            letterSpacing: "5px",
            textTransform: "uppercase",
            lineHeight: 1.15,
            color: accent,
            margin: 0,
          }}
        >
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "11.5px", color: body, marginTop: "10px", letterSpacing: "2.5px" }}>{personal.jobTitle}</p>
        <div style={{ width: "32px", height: "1px", backgroundColor: accent, margin: "18px auto 14px auto", ...printColors }} />
        <div
          style={{
            fontSize: "10px",
            color: muted,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            rowGap: "4px",
            whiteSpace: "normal",
          }}
        >
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ width: "1px", height: "10px", backgroundColor: hairline, margin: "0 14px", display: "inline-block", ...printColors }} />}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "34px", ...noBreak }}>
          <p style={{ lineHeight: "1.9", textAlign: "center", maxWidth: "80%", margin: "0 auto", color: body, fontSize: "11.5px" }}>
            {personal.summary}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "44px", marginTop: "40px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "34px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "22px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "9.5px", color: muted, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: body, fontStyle: "italic", margin: "2px 0 9px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7", color: body, fontSize: "10.5px" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
                        <span style={{ color: accent, flexShrink: 0 }}>–</span>
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
            <div style={{ marginBottom: "34px" }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "16px", ...noBreak }}>
                  <h3 style={{ fontSize: "12px", fontWeight: 700, color: ink, margin: 0 }}>{proj.name}</h3>
                  <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.7", marginTop: "2px" }}>{proj.description}</div>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", fontStyle: "italic", color: muted, marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: "205px", flexShrink: 0 }}>
          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: "34px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "16px", ...noBreak }}>
                  <h3 style={{ fontSize: "12px", fontWeight: 700, color: ink, lineHeight: 1.4, margin: 0 }}>{edu.degree}</h3>
                  <div style={{ fontSize: "10.5px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "9.5px", color: muted, marginTop: "2px" }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "34px" }}>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ fontSize: "10.5px", lineHeight: "1.8", color: body }}>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "13px", ...noBreak }}>
                    <span style={{ fontWeight: 700, color: ink, display: "block", marginBottom: "3px" }}>{s.category}</span>
                    <span style={{ color: body }}>{s.items.map(i => i.name).join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "12px", fontSize: "10.5px", ...noBreak }}>
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
MinDesign1.displayName = "MinDesign1";
export default MinDesign1;