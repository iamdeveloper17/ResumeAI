"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#4f46e5";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "60px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "300", color: "#111" }}>{personal.fullName}</h1>
        <div style={{ width: "50px", height: "3px", backgroundColor: accent, margin: "16px auto" }}></div>
        <p style={{ color: "#666", letterSpacing: "2px", textTransform: "uppercase", fontSize: "10px" }}>{personal.jobTitle}</p>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
          <div>
            <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>INFO</h2>
            <div style={{ fontSize: "10px", color: "#555", lineHeight: "2" }}>
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
            </div>

            {skills.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>SKILLS</h2>
                <div style={{ fontSize: "10px", color: "#555", lineHeight: "1.8" }}>
                  {skills.flatMap(s => s.items).map(i => i.name).join(" • ")}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>EDUCATION</h2>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "12px", fontSize: "10px" }}>
                    <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                    <div style={{ color: "#666" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* 🚀 SUMMARY */}
            {personal.summary && (
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>SUMMARY</h2>
                <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
              </div>
            )}

            <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>EXPERIENCE</h2>
            {experience.map(exp => (
              <div key={exp._id} style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: "bold", fontSize: "12px" }}>{exp.position}</div>
                <div style={{ fontSize: "10px", color: "#666", marginBottom: "6px" }}>{exp.company} / {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                <ul style={{ paddingLeft: "14px", lineHeight: "1.6", color: "#444", fontSize: "10px" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}

            {projects && projects.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>PROJECTS</h2>
                {projects.map(proj => (
                  <div key={proj._id} style={{ marginBottom: "12px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "11px" }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: "10px", color: "#555" }}>{proj.description}</div>}
                  </div>
                ))}
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, marginBottom: "16px", letterSpacing: "1px" }}>CERTIFICATIONS</h2>
                {certifications.map(cert => (
                  <div key={cert._id} style={{ marginBottom: "8px", fontSize: "10px" }}>
                    <div style={{ fontWeight: "bold" }}>{cert.name}</div>
                    <div style={{ color: "#666" }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
ExecDesign3.displayName = "ExecDesign3";
export default ExecDesign3;