"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#374151";

  // 🎨 Design tokens
  const ink = "#1c1917";
  const body = "#3f3a36";
  const muted = "#78716c";

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

  // Heading: small caps, accent, hairline beneath
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "14px", whiteSpace: "normal" }}>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          fontVariant: "small-caps",
          letterSpacing: "1.6px",
          color: accent,
          margin: 0,
          paddingBottom: "5px",
        }}
      >
        {children}
      </h2>
      <div style={{ height: "1px", backgroundColor: accent, opacity: 0.5, ...printColors }} />
    </div>
  );

  const Diamond = () => (
    <span
      style={{
        width: "4px",
        height: "4px",
        backgroundColor: accent,
        transform: "rotate(45deg)",
        marginTop: "8px",
        flexShrink: 0,
        ...printColors,
      }}
    />
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "40px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "Georgia, serif", // 🚀 Dynamic Font
        fontSize: data.fontSize || "11px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Outer frame */}
      <div style={{ border: `3px solid ${accent}`, padding: "7px", minHeight: "1040px", ...printColors }}>
        {/* Inner hairline frame */}
        <div style={{ border: `1px solid ${accent}`, padding: "38px 40px", minHeight: "1010px", ...printColors }}>
          {/* HEADER */}
          <div style={{ textAlign: "center", paddingBottom: "22px", marginBottom: "26px", position: "relative", borderBottom: `1px solid ${accent}`, ...printColors }}>
            <h1
              style={{
                fontSize: "34px",
                fontWeight: 700,
                fontVariant: "small-caps",
                letterSpacing: "3.5px",
                lineHeight: 1.1,
                color: ink,
                margin: 0,
              }}
            >
              {personal.fullName}
            </h1>
            <p style={{ fontSize: "13px", marginTop: "9px", fontStyle: "italic", color: accent, letterSpacing: "1px", fontWeight: 600 }}>
              {personal.jobTitle}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                rowGap: "4px",
                fontSize: "10.5px",
                color: body,
                marginTop: "14px",
                whiteSpace: "normal",
              }}
            >
              {contacts.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                  {i > 0 && (
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: accent,
                        transform: "rotate(45deg)",
                        margin: "0 13px",
                        display: "inline-block",
                        ...printColors,
                      }}
                    />
                  )}
                  {c}
                </span>
              ))}
            </div>
            {/* centre ornament on the rule */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-4px",
                width: "7px",
                height: "7px",
                marginLeft: "-3.5px",
                backgroundColor: accent,
                transform: "rotate(45deg)",
                ...printColors,
              }}
            />
          </div>

          {personal.summary && (
            <div style={{ marginBottom: "26px", textAlign: "center", fontStyle: "italic", padding: "0 18px", ...noBreak }}>
              <p style={{ lineHeight: "1.75", color: body, fontSize: "11.5px", margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "18px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>{exp.position}</span>
                    <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", color: accent, fontWeight: 600, margin: "1px 0 6px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.6", color: body }}>
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

          {skills.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ fontSize: "11px", lineHeight: "1.7", color: body }}>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "6px", ...noBreak }}>
                    <span style={{ fontWeight: 700, color: ink }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12px", color: ink }}>{proj.name}</span>
                    {proj.link && <span style={{ fontSize: "10px", fontStyle: "italic", color: accent }}>{proj.link}</span>}
                  </div>
                  {proj.description && <div style={{ fontSize: "11px", lineHeight: "1.6", color: body, marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", fontStyle: "italic", color: muted, marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                  <div style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>{edu.degree}</div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", color: muted, marginTop: "1px" }}>
                    {edu.institution} | {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px", ...noBreak }}>
                  <div style={{ fontWeight: 700, color: ink }}>{cert.name}</div>
                  <div style={{ color: muted, fontStyle: "italic" }}>
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
ClassicDesign5.displayName = "ClassicDesign5";
export default ClassicDesign5;