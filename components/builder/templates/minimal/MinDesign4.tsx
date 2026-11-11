"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#ef4444";

  // 🎨 Design tokens (Swiss / high-contrast)
  const ink = "#0a0a0a";
  const body = "#3f3f46";
  const muted = "#71717a";

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

  const SectionTitle = ({ children, mb = 16 }: { children: React.ReactNode; mb?: number }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderBottom: `2px solid ${ink}`,
        paddingBottom: "6px",
        marginBottom: `${mb}px`,
        whiteSpace: "normal",
        ...printColors,
      }}
    >
      <span style={{ width: "8px", height: "8px", backgroundColor: accent, display: "inline-block", flexShrink: 0, ...printColors }} />
      <h2 style={{ fontSize: "12.5px", fontWeight: 800, color: ink, letterSpacing: "-0.1px", margin: 0 }}>{children}</h2>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `5px solid ${ink}`,
          paddingBottom: "22px",
          marginBottom: "38px",
          flexWrap: "wrap",
          gap: "16px",
          ...printColors,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1
            style={{
              fontSize: "44px",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-2px",
              textTransform: "uppercase",
              color: ink,
              margin: 0,
            }}
          >
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: 700, color: accent, marginTop: "12px", letterSpacing: "0.4px" }}>{personal.jobTitle}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "10.5px", fontWeight: 600, lineHeight: "1.75", color: ink }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "40px", alignItems: "start" }}>
        {/* LEFT COLUMN */}
        <div>
          {personal.summary && (
            <div style={{ marginBottom: "32px", ...noBreak }}>
              <SectionTitle mb={12}>Profile</SectionTitle>
              <p style={{ fontSize: "10.5px", lineHeight: "1.75", fontWeight: 500, color: body, margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle mb={12}>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "15px", ...noBreak }}>
                  <div style={{ fontWeight: 800, fontSize: "11.5px", color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "2px" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <SectionTitle mb={12}>Skills</SectionTitle>
              <div style={{ fontSize: "10.5px", lineHeight: "1.75", color: body }}>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "8px", ...noBreak }}>
                    <span style={{ fontWeight: 800, color: ink }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ minWidth: 0 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "22px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px", flexWrap: "wrap", gap: "6px" }}>
                    <h3 style={{ fontSize: "13.5px", fontWeight: 800, color: ink, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: ink, marginBottom: "7px" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", lineHeight: "1.7", color: body }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                        <span style={{ width: "4px", height: "4px", backgroundColor: ink, marginTop: "8px", flexShrink: 0, ...printColors }} />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontSize: "12.5px", fontWeight: 800, color: ink }}>{proj.name}</div>
                  {proj.description && (
                    <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.65", marginTop: "2px" }}>{proj.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", ...noBreak }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 800, color: ink }}>{cert.name}</div>
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
MinDesign4.displayName = "MinDesign4";
export default MinDesign4;