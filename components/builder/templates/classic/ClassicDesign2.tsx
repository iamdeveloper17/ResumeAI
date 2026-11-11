"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#000";
  const textColor = data.textColor || "#000000";

  // 🎨 Derived tokens (all follow the user's text color)
  const rule = `${textColor}30`; // hairline, same alpha trick as the original

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

  // Classic section heading: small caps in accent, hairline beneath
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "13px", whiteSpace: "normal" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 700,
          fontVariant: "small-caps",
          letterSpacing: "1.3px",
          color: accent,
          margin: 0,
          paddingBottom: "4px",
        }}
      >
        {children}
      </h2>
      <div style={{ height: "1px", backgroundColor: rule, position: "relative", ...printColors }}>
        <div style={{ position: "absolute", left: 0, top: "-1px", width: "28px", height: "2px", backgroundColor: accent, ...printColors }} />
      </div>
    </div>
  );

  const Diamond = ({ size = 4, top = 8 }: { size?: number; top?: number }) => (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: accent,
        transform: "rotate(45deg)",
        marginTop: `${top}px`,
        flexShrink: 0,
        ...printColors,
      }}
    />
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "46px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "Georgia, serif",
        fontSize: data.fontSize || "11px",
        color: textColor, // 🚀 Apply text color
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 700,
            fontVariant: "small-caps",
            letterSpacing: "2.5px",
            lineHeight: 1.1,
            color: accent,
            margin: 0,
          }}
        >
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "14px", fontStyle: "italic", marginTop: "8px", opacity: 0.85 }}>{personal.jobTitle}</p>
        <div
          style={{
            fontSize: "10.5px",
            marginTop: "16px",
            borderTop: `1.5px solid ${accent}`,
            borderBottom: `0.5px solid ${accent}`,
            padding: "8px 0",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "6px 22px",
            whiteSpace: "normal",
            ...printColors,
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {personal.summary && (
            <div style={{ marginBottom: "26px", ...noBreak }}>
              <SectionTitle>Summary</SectionTitle>
              <p style={{ lineHeight: "1.75", textAlign: "justify", fontSize: "11.5px", margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "18px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12.5px" }}>{exp.position}</span>
                    <span style={{ fontSize: "10px", fontStyle: "italic", opacity: 0.75, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", color: accent, fontWeight: 600, margin: "1px 0 7px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.6" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                        <Diamond />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontWeight: 700, fontSize: "12px" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", lineHeight: "1.6", marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", fontStyle: "italic", opacity: 0.8, marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ width: "205px", flexShrink: 0, borderLeft: `1px solid ${rule}`, paddingLeft: "22px" }}>
          {education.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontWeight: 700, fontSize: "12px", lineHeight: 1.35 }}>{edu.degree}</div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", marginTop: "1px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", marginTop: "2px", opacity: 0.75 }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Skills</SectionTitle>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.75" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                    <Diamond size={3.5} top={8} />
                    <span style={{ minWidth: 0 }}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px", ...noBreak }}>
                  <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{cert.name}</div>
                  <div style={{ opacity: 0.8, fontStyle: "italic", marginTop: "1px" }}>
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ClassicDesign2.displayName = "ClassicDesign2";
export default ClassicDesign2;