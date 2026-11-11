"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#2563eb";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#334155";
  const muted = "#64748b";
  const hairline = "#e2e8f0";
  const tint = `${accent}14`; // soft accent background (8% alpha)

  // 🚀 Global Text Break Style
  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  // Keep colors intact when exporting / printing to PDF
  const printColors = {
    WebkitPrintColorAdjust: "exact" as const,
    printColorAdjust: "exact" as const,
  };

  const noBreak = { breakInside: "avoid" as const, pageBreakInside: "avoid" as const };

  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
    personal.github,
  ].filter(Boolean);

  // Section heading: accent title + hairline that runs to the margin
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "13px", fontWeight: 700, color: accent, letterSpacing: "0.3px", margin: 0, flexShrink: 0 }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: hairline }} />
    </div>
  );

  const chip = {
    fontSize: "9px",
    color: body,
    backgroundColor: "#f8fafc",
    border: `1px solid ${hairline}`,
    padding: "2px 8px",
    borderRadius: "999px",
    lineHeight: "1.5",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        padding: "44px 44px 40px 44px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Top accent band */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div style={{ paddingBottom: "18px", marginBottom: "26px", borderBottom: `1px solid ${hairline}` }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: ink, letterSpacing: "-0.8px", lineHeight: 1.1, margin: 0 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "14px", fontWeight: 600, color: accent, marginTop: "6px", letterSpacing: "0.2px" }}>
          {personal.jobTitle}
        </p>
        <div style={{ width: "40px", height: "3px", backgroundColor: accent, borderRadius: "2px", margin: "12px 0 12px 0", ...printColors }} />
        <div style={{ fontSize: "10px", color: muted, display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: "4px", whiteSpace: "normal" }}>
          {contacts.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && (
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: accent, margin: "0 10px", display: "inline-block", ...printColors }} />
              )}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "26px", ...noBreak }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ fontSize: "11px", lineHeight: "1.7", color: body, margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Experience</SectionTitle>
          <div style={{ position: "relative", paddingLeft: "18px", borderLeft: `2px solid ${hairline}` }}>
            {experience.map(exp => (
              <div key={exp._id} style={{ position: "relative", marginBottom: "18px", ...noBreak }}>
                {/* timeline node */}
                <span
                  style={{
                    position: "absolute",
                    left: "-25px",
                    top: "3px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: `2.5px solid ${accent}`,
                    ...printColors,
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px", flexWrap: "wrap", gap: "6px" }}>
                  <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: "9px", fontWeight: 600, color: accent, backgroundColor: tint, padding: "3px 9px", borderRadius: "999px", ...printColors }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: muted, fontWeight: 500, marginBottom: "7px" }}>
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px", lineHeight: "1.65", color: body }}>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ marginBottom: "3px" }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Education</SectionTitle>
          {education.map(edu => (
            <div
              key={edu._id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "12px", ...noBreak }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </div>
                <div style={{ fontSize: "10px", color: muted, marginTop: "2px" }}>
                  {edu.institution} {edu.grade && `• ${edu.grade}`}
                </div>
              </div>
              <div style={{ fontSize: "9px", fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Skills</SectionTitle>
          {skills.map(s => (
            <div
              key={s._id}
              style={{ display: "grid", gridTemplateColumns: "110px 1fr", columnGap: "14px", alignItems: "start", marginBottom: "9px", ...noBreak }}
            >
              <div style={{ fontSize: "10px", fontWeight: 700, color: ink, paddingTop: "2px" }}>{s.category}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {s.items.map((i, idx) => (
                  <span key={`${i.name}-${idx}`} style={chip}>{i.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "26px" }}>
          <SectionTitle>Projects</SectionTitle>
          {projects.map(proj => (
            <div
              key={proj._id}
              style={{ marginBottom: "13px", paddingLeft: "12px", borderLeft: `3px solid ${accent}`, ...noBreak }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink }}>{proj.name}</div>
                {proj.link && <div style={{ fontSize: "9px", fontWeight: 500, color: accent }}>{proj.link}</div>}
              </div>
              {proj.description && (
                <div style={{ fontSize: "10px", lineHeight: "1.6", color: body, marginTop: "3px" }}>{proj.description}</div>
              )}
              {proj.techStack && proj.techStack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "9px", color: muted, fontStyle: "italic", marginRight: "2px" }}>Tech:</span>
                  {proj.techStack.map((t, i) => (
                    <span key={i} style={{ ...chip, fontSize: "8.5px", padding: "1px 7px" }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <div>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map(cert => (
            <div
              key={cert._id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "8px", ...noBreak }}
            >
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: ink }}>{cert.name}</div>
                <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
              </div>
              {cert.date && (
                <div style={{ fontSize: "9px", fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>{cert.date}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ModernDesign1.displayName = "ModernDesign1";
export default ModernDesign1;
