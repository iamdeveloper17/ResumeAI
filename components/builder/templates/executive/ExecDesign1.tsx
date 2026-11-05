"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "50px", minHeight: "1123px", fontFamily: data.fontFamily || "Georgia, serif", fontSize: data.fontSize || "11px", color: "#333", ...textBreakStyle }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "2px" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", color: "#555", marginTop: "8px", letterSpacing: "1px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "11px", color: "#666", marginTop: "12px" }}>
          {personal.email} {personal.phone && `| ${personal.phone}`} {personal.location && `| ${personal.location}`}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>EXECUTIVE SUMMARY</h2>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px", flexWrap: "wrap" }}>
                <span>{exp.position}</span>
                <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <div style={{ fontStyle: "italic", color: "#555", marginBottom: "4px" }}>{exp.company}</div>
              <ul style={{ paddingLeft: "18px", lineHeight: "1.5" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
              <div style={{ fontStyle: "italic", color: "#555" }}>{edu.institution} {edu.grade && `• ${edu.grade}`}</div>
              <div style={{ fontSize: "10px", color: "#777" }}>{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>SKILLS</h2>
          <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
            {skills.map(s => (
              <div key={s._id} style={{ marginBottom: "6px" }}>
                <span style={{ fontWeight: "bold" }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>PROJECTS</h2>
          {projects.map((proj) => (
            <div key={proj._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{proj.name}</div>
              {proj.description && <div style={{ fontSize: "11px", color: "#555" }}>{proj.description}</div>}
              {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", fontStyle: "italic", color: "#777" }}>Tech: {proj.techStack.join(", ")}</div>}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "10px" }}>CERTIFICATIONS</h2>
          {certifications.map((cert) => (
            <div key={cert._id} style={{ marginBottom: "8px", fontSize: "11px" }}>
              <div style={{ fontWeight: "bold" }}>{cert.name}</div>
              <div style={{ color: "#666" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ExecDesign1.displayName = "ExecDesign1";
export default ExecDesign1;