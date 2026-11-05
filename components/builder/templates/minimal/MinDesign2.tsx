"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#111827";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "50px 60px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: "40px", borderBottom: "2px solid #000", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "-1px", color: "#000" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", color: accent, marginTop: "4px", fontWeight: "600" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "10px", color: "#666", marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, marginBottom: "12px" }}>Profile</h2>
          <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#444" }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "3px", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "20px", marginBottom: "24px" }}>
              <div style={{ fontSize: "10px", color: "#666", fontWeight: "bold", paddingTop: "2px" }}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>{exp.position}</h3>
                <div style={{ fontSize: "12px", color: accent, fontWeight: "600", marginBottom: "6px" }}>{exp.company}</div>
                <ul style={{ paddingLeft: "16px", lineHeight: "1.6", color: "#444", fontSize: "11px" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "32px" }}>
        
        {/* EDUCATION & CERTIFICATIONS */}
        <div>
          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>Education</h2>
              {education.map((edu) => (
                <div key={edu._id} style={{ marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</h3>
                  <div style={{ fontSize: "11px", color: "#666" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", color: "#888" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert._id} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#666" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SKILLS & PROJECTS */}
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>Skills</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <span key={i} style={{ backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "4px", fontSize: "10px", color: "#333" }}>{item.name}</span>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", color: "#777", fontStyle: "italic" }}>Tech: {proj.techStack.join(", ")}</div>
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
MinDesign2.displayName = "MinDesign2";
export default MinDesign2;