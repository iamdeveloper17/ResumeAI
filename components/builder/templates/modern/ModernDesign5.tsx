"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#ea580c";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "50px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #e2e8f0", paddingBottom: "24px", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "34px", fontWeight: "bold", color: "#0f172a" }}>{personal.fullName}</h1>
          <p style={{ fontSize: "14px", color: accent, fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>{personal.jobTitle}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "10px", color: "#64748b", textAlign: "right" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#334155" }}>{personal.summary}</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div>
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>{exp.position}</div>
                  <div style={{ fontSize: "10px", color: accent, fontWeight: "bold", marginBottom: "4px" }}>{exp.company}</div>
                  <div style={{ fontSize: "9px", color: "#94a3b8", marginBottom: "6px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                  <ul style={{ paddingLeft: "14px", fontSize: "10px", color: "#475569", lineHeight: "1.6" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "10px", color: "#475569" }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
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
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Education</h2>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>{edu.degree}</div>
                  <div style={{ fontSize: "10px", color: "#475569" }}>{edu.institution}</div>
                  <div style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#475569" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ModernDesign5.displayName = "ModernDesign5";
export default ModernDesign5;