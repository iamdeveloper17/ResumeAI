"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#000000";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "60px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", color: "#333", ...textBreakStyle }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "300", letterSpacing: "4px", textTransform: "uppercase", color: accent }}>{personal.fullName}</h1>
        <p style={{ fontSize: "11px", color: "#666", marginTop: "8px", letterSpacing: "2px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "10px", color: "#888", marginTop: "16px", display: "flex", justifyContent: "center", gap: "12px" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "32px" }}>
          <p style={{ lineHeight: "1.8", textAlign: "center", maxWidth: "80%", margin: "0 auto", color: "#555" }}>{personal.summary}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        <div style={{ width: "65%" }}>
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp._id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</h3>
                    <span style={{ fontSize: "10px", color: "#888" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666", fontStyle: "italic", marginBottom: "8px" }}>{exp.company}</div>
                  <ul style={{ paddingLeft: "16px", lineHeight: "1.6", color: "#555" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "4px" }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj._id} style={{ marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</h3>
                  <div style={{ fontSize: "11px", color: "#555" }}>{proj.description}</div>
                  {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", fontStyle: "italic", color: "#777", marginTop: "2px" }}>Tech: {proj.techStack.join(", ")}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: "35%" }}>
          {/* EDUCATION */}
          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Education</h2>
              {education.map((edu) => (
                <div key={edu._id} style={{ marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</h3>
                  <div style={{ fontSize: "11px", color: "#666" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Skills</h2>
              <div style={{ fontSize: "11px", lineHeight: "1.8", color: "#555" }}>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>{s.category}</span>
                    <span style={{ color: "#666" }}>{s.items.map(i => i.name).join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: accent, borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert._id} style={{ marginBottom: "12px", fontSize: "11px" }}>
                  <div style={{ fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ color: "#666" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
MinDesign1.displayName = "MinDesign1";
export default MinDesign1;