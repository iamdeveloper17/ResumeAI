"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0d9488";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "50px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", color: accent, fontWeight: "600", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{personal.jobTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "10px", color: "#666", marginTop: "12px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {personal.summary && (
          <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px", color: "#333" }}>Profile</h2>
            <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#555" }}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", color: "#333" }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp._id} style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#111" }}>{exp.position}</div>
                <div style={{ fontSize: "11px", color: accent, fontWeight: "600", marginBottom: "4px" }}>{exp.company} <span style={{ color: "#888", fontWeight: "normal" }}>| {exp.startDate} - {exp.current ? "Present" : exp.endDate}</span></div>
                <ul style={{ paddingLeft: "16px", fontSize: "11px", color: "#555", lineHeight: "1.6" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Skills</h2>
            {skills.map(s => (
              <div key={s._id} style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "10px", fontWeight: "bold", color: "#1e293b" }}>{s.category}</div>
                <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>{s.items.map(i => i.name).join(", ")}</div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", color: "#333" }}>Education</h2>
            {education.map(edu => (
              <div key={edu._id} style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "#111" }}>{edu.degree}</div>
                <div style={{ fontSize: "11px", color: "#555" }}>{edu.institution} | {edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", color: "#333" }}>Projects</h2>
            {projects.map(proj => (
              <div key={proj._id} style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                {proj.description && <div style={{ fontSize: "11px", color: "#555" }}>{proj.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", color: "#333" }}>Certifications</h2>
            {certifications.map(cert => (
              <div key={cert._id} style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                <div style={{ fontSize: "10px", color: "#555" }}>{cert.issuer}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
ModernDesign3.displayName = "ModernDesign3";
export default ModernDesign3;