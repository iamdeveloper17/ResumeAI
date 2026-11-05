"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1f2937";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ 
      padding: "60px", 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "'Times New Roman', Times, serif", // 🚀 Dynamic Font
      fontSize: data.fontSize || "11px", 
      ...textBreakStyle 
    }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `3px double ${accent}`, paddingBottom: "20px", marginBottom: "30px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: accent, letterSpacing: "1px" }}>{personal.fullName}</h1>
          <p style={{ fontSize: "14px", marginTop: "4px", textTransform: "uppercase", letterSpacing: "2px" }}>{personal.jobTitle}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px", lineHeight: "1.6" }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
        {/* LEFT COLUMN */}
        <div>
          {personal.summary && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Summary</h2>
              <p style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify" }}>{personal.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Skills</h2>
              <ul style={{ paddingLeft: "16px", lineHeight: "1.8" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px" }}>
                  <div style={{ fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ color: "#555" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px" }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px", flexWrap: "wrap" }}>
                    <span>{exp.position}</span>
                    <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", marginBottom: "6px" }}>{exp.company}</div>
                  <ul style={{ paddingLeft: "20px", lineHeight: "1.5" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px" }}>Education</h2>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px", flexWrap: "wrap" }}>
                    <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                    <span>{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px" }}>{edu.institution} {edu.grade && `• ${edu.grade}`}</div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px" }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <span>{proj.name}</span>
                    {proj.link && <span style={{ fontSize: "10px", fontWeight: "normal", color: accent }}>{proj.link}</span>}
                  </div>
                  {proj.description && <div style={{ fontSize: "11px", marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", fontStyle: "italic", color: "#555", marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>
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
ClassicDesign4.displayName = "ClassicDesign4";
export default ClassicDesign4;