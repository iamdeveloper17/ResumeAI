"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#2563eb";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ color: "#f3f4f6", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", padding: "50px", ...textBreakStyle }}>
      <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: "20px", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: accent }}>{personal.fullName}</h1>
        <p style={{ fontSize: "16px", color: accent, textTransform: "uppercase", letterSpacing: "2px" }}>{personal.jobTitle}</p>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ width: "30%", minWidth: "200px" }}>
          <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>CONTACT</h2>
          <div style={{ fontSize: "11px", color: "#9ca3af", lineHeight: "2", marginBottom: "24px" }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
          </div>

          <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginTop: "32px", marginBottom: "16px" }}>SKILLS</h2>
          <div style={{ fontSize: "11px", color: "#9ca3af", lineHeight: "1.8" }}>
            {skills.flatMap(s => s.items).map(i => i.name).join(", ")}
          </div>

          {certifications && certifications.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>CERTIFICATIONS</h2>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", fontSize: "10px", color: "#9ca3af" }}>
                  <div style={{ fontWeight: "bold", color: accent }}>{cert.name}</div>
                  <div>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: "70%", minWidth: "300px" }}>
          
          {/* 🚀 SUMMARY */}
          {personal.summary && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>SUMMARY</h2>
              <p style={{ fontSize: "11px", color: "#d1d5db", lineHeight: "1.6" }}>{personal.summary}</p>
            </div>
          )}

          <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp._id} style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}>{exp.position}</h3>
              <div style={{ fontSize: "11px", color: accent, fontWeight: "bold", marginBottom: "8px" }}>{exp.company}</div>
              <ul style={{ paddingLeft: "16px", color: "#9ca3af", lineHeight: "1.6" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}

          {education.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>EDUCATION</h2>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h2 style={{ fontSize: "12px", color: accent, fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>PROJECTS</h2>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: accent }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", color: "#9ca3af" }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ExecDesign5.displayName = "ExecDesign5";
export default ExecDesign5;