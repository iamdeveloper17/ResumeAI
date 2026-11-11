"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

  // 🎨 Design tokens
  const ink = "#111827";
  const body = "#374151";
  const muted = "#6b7280";
  const hairline = "#d1d5db";

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

  // Classic section heading: small caps, accent, double rule beneath
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "14px", whiteSpace: "normal" }}>
      <h2
        style={{
          fontSize: "13.5px",
          fontWeight: 700,
          fontVariant: "small-caps",
          letterSpacing: "1.4px",
          color: accent,
          margin: 0,
          paddingBottom: "5px",
        }}
      >
        {children}
      </h2>
      <div style={{ borderTop: `1.5px solid ${accent}`, borderBottom: `0.5px solid ${accent}`, height: "2px", ...printColors }} />
    </div>
  );

  const Bullet = () => (
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
        padding: "54px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "Georgia, serif", // 🚀 Dynamic Font
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", paddingBottom: "22px", marginBottom: "28px", borderBottom: `1px solid ${hairline}`, position: "relative" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 700,
            fontVariant: "small-caps",
            letterSpacing: "3px",
            lineHeight: 1.1,
            color: accent,
            margin: 0,
          }}
        >
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "14px", fontStyle: "italic", color: body, marginTop: "8px" }}>{personal.jobTitle}</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", fontSize: "10.5px", color: body, marginTop: "14px", whiteSpace: "normal" }}>
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ margin: "0 12px", color: accent }}>|</span>}
              {c}
            </span>
          ))}
        </div>
        {/* accent centre mark on the rule */}
        <div style={{ position: "absolute", left: "50%", bottom: "-2px", width: "80px", height: "3px", marginLeft: "-40px", backgroundColor: accent, ...printColors }} />
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "26px", ...noBreak }}>
          <p style={{ lineHeight: "1.75", textAlign: "justify", color: body, fontSize: "11.5px", margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map(exp => (
            <div key={exp._id} style={{ marginBottom: "18px", ...noBreak }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>{exp.position}</span>
                <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div style={{ fontStyle: "italic", color: accent, fontWeight: 600, margin: "1px 0 7px 0" }}>{exp.company}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.6", color: body }}>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                    <Bullet />
                    <span style={{ minWidth: 0 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
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

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
              <div style={{ fontWeight: 700, fontSize: "12px", color: ink }}>{proj.name}</div>
              {proj.description && <div style={{ fontSize: "11px", lineHeight: "1.6", color: body, marginTop: "2px" }}>{proj.description}</div>}
              {proj.techStack && proj.techStack.length > 0 && (
                <div style={{ fontSize: "10px", fontStyle: "italic", color: muted, marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Education</SectionTitle>
          {education.map(edu => (
            <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </span>
                <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div style={{ fontStyle: "italic", color: body, marginTop: "1px" }}>
                {edu.institution} {edu.grade && `• ${edu.grade}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <div>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map(cert => (
            <div key={cert._id} style={{ marginBottom: "9px", fontSize: "11px", ...noBreak }}>
              <div style={{ fontWeight: 700, color: ink }}>{cert.name}</div>
              <div style={{ color: muted, fontStyle: "italic" }}>
                {cert.issuer} {cert.date && `• ${cert.date}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ClassicDesign1.displayName = "ClassicDesign1";
export default ClassicDesign1;