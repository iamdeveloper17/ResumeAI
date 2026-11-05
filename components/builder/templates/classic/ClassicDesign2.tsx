"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#000";
  const textColor = data.textColor || "#000000";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ 
      padding: "40px", 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "Georgia, serif",
      fontSize: data.fontSize || "11px", 
      color: textColor, // 🚀 Apply text color
      ...textBreakStyle 
    }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", letterSpacing: "1px", color: accent }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", marginTop: "4px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "11px", marginTop: "8px", borderTop: `1px solid ${textColor}`, borderBottom: `1px solid ${textColor}`, padding: "6px 0", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* LEFT COLUMN */}
        <div style={{ width: "65%", minWidth: "300px" }}>
          {personal.summary && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>Summary</h2>
              <p style={{ lineHeight: "1.6", textAlign: "justify" }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "16px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>{exp.position}</div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", marginBottom: "4px" }}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                  <ul style={{ paddingLeft: "18px", lineHeight: "1.5" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", fontStyle: "italic", opacity: 0.8, marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ width: "35%", borderLeft: `1px solid ${textColor}30`, paddingLeft: "20px", minWidth: "200px" }}>
          {education.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Education</h2>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>{edu.degree}</div>
                  <div style={{ fontStyle: "italic", fontSize: "11px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", marginTop: "2px" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>Skills</h2>
              <ul style={{ paddingLeft: "18px", lineHeight: "1.8" }}>
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
                  <div style={{ opacity: 0.8 }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ClassicDesign2.displayName = "ClassicDesign2";
export default ClassicDesign2;