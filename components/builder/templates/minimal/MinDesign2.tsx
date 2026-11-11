"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#111827";

  // 🎨 Design tokens (editorial, high contrast)
  const ink = "#0a0a0a";
  const body = "#404040";
  const muted = "#737373";
  const hairline = "#e5e5e5";
  const chipBg = "#f4f4f5";

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

  // Heading: small bold accent label with a short rule above
  const SectionTitle = ({ children, mb = 18 }: { children: React.ReactNode; mb?: number }) => (
    <div style={{ marginBottom: `${mb}px`, whiteSpace: "normal" }}>
      <div style={{ width: "22px", height: "3px", backgroundColor: accent, marginBottom: "8px", ...printColors }} />
      <h2 style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.6px", color: accent, margin: 0 }}>{children}</h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "52px 60px",
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
      <div style={{ marginBottom: "38px", borderBottom: `3px solid ${ink}`, paddingBottom: "22px", ...printColors }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-1.5px",
            lineHeight: 1,
            color: ink,
            margin: 0,
          }}
        >
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "15px", color: accent, marginTop: "10px", fontWeight: 600, letterSpacing: "0.2px" }}>{personal.jobTitle}</p>
        <div
          style={{
            fontSize: "10.5px",
            color: muted,
            marginTop: "14px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            rowGap: "4px",
            whiteSpace: "normal",
          }}
        >
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ width: "1px", height: "10px", backgroundColor: "#d4d4d4", margin: "0 14px", display: "inline-block", ...printColors }} />}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "34px", ...noBreak }}>
          <SectionTitle mb={12}>Profile</SectionTitle>
          <p style={{ fontSize: "12.5px", lineHeight: "1.8", color: body, margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "34px" }}>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div
              key={exp._id}
              style={{
                display: "grid",
                gridTemplateColumns: "130px minmax(0, 1fr)",
                columnGap: "24px",
                paddingTop: idx === 0 ? 0 : "20px",
                marginBottom: "20px",
                borderTop: idx === 0 ? "none" : `1px solid ${hairline}`,
                ...noBreak,
              }}
            >
              <div style={{ fontSize: "10px", color: muted, fontWeight: 700, paddingTop: "3px" }}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, color: ink, margin: 0 }}>{exp.position}</h3>
                <div style={{ fontSize: "12px", color: accent, fontWeight: 600, margin: "2px 0 8px 0" }}>{exp.company}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.7", color: body, fontSize: "10.5px" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                      <span style={{ width: "4px", height: "4px", backgroundColor: ink, marginTop: "8px", flexShrink: 0, ...printColors }} />
                      <span style={{ minWidth: 0 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "44px",
          marginTop: "40px",
          borderTop: `1px solid ${hairline}`,
          paddingTop: "32px",
        }}
      >
        {/* EDUCATION & CERTIFICATIONS */}
        <div>
          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "16px", ...noBreak }}>
                  <h3 style={{ fontSize: "12.5px", fontWeight: 800, color: ink, lineHeight: 1.4, margin: 0 }}>{edu.degree}</h3>
                  <div style={{ fontSize: "11px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "2px", fontWeight: 600 }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "11px", ...noBreak }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SKILLS & PROJECTS */}
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: chipBg,
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: ink,
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

          {projects && projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "14px", ...noBreak }}>
                  <div style={{ fontSize: "12.5px", fontWeight: 800, color: ink }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.65", marginTop: "2px" }}>{proj.description}</div>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", color: muted, fontStyle: "italic", marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
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
MinDesign2.displayName = "MinDesign2";
export default MinDesign2;