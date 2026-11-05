"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#2563eb";

  // 🚀 Global Text Break Style
  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "40px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", color: "#1e293b", ...textBreakStyle }}>
      
      {/* HEADER */}
      <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: "20px", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: accent, letterSpacing: "-0.5px" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", fontWeight: "500", color: "#475569", marginTop: "4px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "10px", color: "#64748b", marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
          {personal.github && <span>• {personal.github}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Summary</h2>
          <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#334155" }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a" }}>{exp.position}</h3>
                <span style={{ fontSize: "9px", color: "#64748b", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <div style={{ fontSize: "11px", color: "#475569", fontStyle: "italic", marginBottom: "6px" }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
              <ul style={{ paddingLeft: "16px", fontSize: "10px", lineHeight: "1.6", color: "#334155" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "2px" }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Education</h2>
          {education.map(edu => (
            <div key={edu._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "bold" }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
              <div style={{ fontSize: "10px", color: "#475569" }}>{edu.institution} {edu.grade && `• ${edu.grade}`}</div>
              <div style={{ fontSize: "9px", color: "#64748b", marginTop: "2px" }}>{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Skills</h2>
          {skills.map(s => (
            <div key={s._id} style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "10px", fontWeight: "bold", color: "#1e293b" }}>{s.category}</div>
              <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>{s.items.map(i => i.name).join(", ")}</div>
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Projects</h2>
          {projects.map(proj => (
            <div key={proj._id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div style={{ fontSize: "11px", fontWeight: "bold" }}>{proj.name}</div>
                {proj.link && <div style={{ fontSize: "9px", color: accent }}>{proj.link}</div>}
              </div>
              {proj.description && <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>{proj.description}</div>}
              {proj.techStack && proj.techStack.length > 0 && (
                <div style={{ fontSize: "9px", color: "#64748b", fontStyle: "italic", marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Certifications</h2>
          {certifications.map(cert => (
            <div key={cert._id} style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
              <div style={{ fontSize: "10px", color: "#475569" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ModernDesign1.displayName = "ModernDesign1";
export default ModernDesign1;