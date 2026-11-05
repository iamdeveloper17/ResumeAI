"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#800000";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ 
      padding: "50px", 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "Georgia, serif", // 🚀 Dynamic Font
      fontSize: data.fontSize || "11px", 
      ...textBreakStyle 
    }}>
      {/* HEADER */}
      <div style={{ backgroundColor: accent, color: "#fff", padding: "30px", textAlign: "center", borderRadius: "4px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", marginTop: "6px", fontStyle: "italic" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "11px", marginTop: "16px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px", textTransform: "uppercase" }}>Professional Summary</h2>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px", textTransform: "uppercase" }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp._id} style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
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

      {skills.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Skills</h2>
          <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
            {skills.map(s => (
              <div key={s._id} style={{ marginBottom: "6px" }}>
                <span style={{ fontWeight: "bold" }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px", textTransform: "uppercase" }}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <span>{proj.name}</span>
                {proj.link && <span style={{ fontSize: "10px", fontWeight: "normal", color: accent }}>{proj.link}</span>}
              </div>
              {proj.description && <div style={{ fontSize: "11px", color: "#333", marginTop: "2px" }}>{proj.description}</div>}
              {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", fontStyle: "italic", color: "#555", marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px", textTransform: "uppercase" }}>Education</h2>
          {education.map(edu => (
            <div key={edu._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{edu.degree} {edu.field}</div>
              <div style={{ fontStyle: "italic", fontSize: "11px" }}>{edu.institution} | {edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px", textTransform: "uppercase" }}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px" }}>
              <div style={{ fontWeight: "bold" }}>{cert.name}</div>
              <div style={{ color: "#444" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ClassicDesign3.displayName = "ClassicDesign3";
export default ClassicDesign3;