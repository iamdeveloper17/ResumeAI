"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#800000";

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

  // Centered heading: rule — small-caps title — rule
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", whiteSpace: "normal" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: accent, opacity: 0.45, ...printColors }} />
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          fontVariant: "small-caps",
          letterSpacing: "1.6px",
          color: accent,
          margin: 0,
          flexShrink: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: accent, opacity: 0.45, ...printColors }} />
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
        padding: "0",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "Georgia, serif", // 🚀 Dynamic Font
        fontSize: data.fontSize || "11px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div style={{ backgroundColor: accent, padding: "26px 26px", ...printColors }}>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.55)",
            color: "#ffffff",
            padding: "26px 24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              fontVariant: "small-caps",
              letterSpacing: "3px",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "14px", marginTop: "8px", fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}>{personal.jobTitle}</p>
          <div
            style={{
              fontSize: "10.5px",
              marginTop: "16px",
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
                {i > 0 && (
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      transform: "rotate(45deg)",
                      margin: "0 14px",
                      display: "inline-block",
                      ...printColors,
                    }}
                  />
                )}
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "34px 54px 50px 54px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "28px", ...noBreak }}>
            <SectionTitle>Professional Summary</SectionTitle>
            <p style={{ lineHeight: "1.75", textAlign: "justify", color: body, fontSize: "11.5px", margin: 0 }}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp._id} style={{ marginBottom: "18px", ...noBreak }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>{exp.position}</span>
                  <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div style={{ fontStyle: "italic", fontSize: "11px", color: accent, fontWeight: 600, margin: "1px 0 7px 0" }}>{exp.company}</div>
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
          <div style={{ marginBottom: "28px" }}>
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
          <div style={{ marginBottom: "28px" }}>
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
          <div style={{ marginBottom: "28px" }}>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                <div style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>
                  {edu.degree} {edu.field}
                </div>
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
  );
});
ClassicDesign3.displayName = "ClassicDesign3";
export default ClassicDesign3;