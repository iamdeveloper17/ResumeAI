"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

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
      color: "#000", 
      ...textBreakStyle 
    }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: accent }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", fontStyle: "italic", marginTop: "6px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "11px", marginTop: "12px" }}>
          {personal.email} {personal.phone && `| ${personal.phone}`} {personal.location && `| ${personal.location}`}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>{personal.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px", flexWrap: "wrap" }}>
                <span>{exp.position}</span>
                <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <div style={{ fontStyle: "italic", marginBottom: "6px" }}>{exp.company}</div>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.5" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
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

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj._id} style={{ marginBottom: "12px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{proj.name}</div>
              {proj.description && <div style={{ fontSize: "11px", marginTop: "2px" }}>{proj.description}</div>}
              {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", fontStyle: "italic", color: "#555", marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Education</h2>
          {education.map((edu) => (
            <div key={edu._id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px", flexWrap: "wrap" }}>
                <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={{ fontStyle: "italic" }}>{edu.institution} {edu.grade && `• ${edu.grade}`}</div>
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "12px" }}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert._id} style={{ marginBottom: "8px", fontSize: "11px" }}>
              <div style={{ fontWeight: "bold" }}>{cert.name}</div>
              <div>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ClassicDesign1.displayName = "ClassicDesign1";
export default ClassicDesign1;