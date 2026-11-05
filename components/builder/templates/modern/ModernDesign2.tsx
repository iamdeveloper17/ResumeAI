"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#4f46e5";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "40px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ padding: "40px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", minHeight: "1040px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "900", color: accent, letterSpacing: "-1px" }}>{personal.fullName}</h1>
            <p style={{ fontSize: "16px", color: "#64748b", marginTop: "4px" }}>{personal.jobTitle}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "10px", color: "#64748b", lineHeight: "1.8" }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
          </div>
        </div>

        {/* SUMMARY */}
        {personal.summary && (
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#334155", fontStyle: "italic", borderLeft: `4px solid ${accent}`, paddingLeft: "16px" }}>{personal.summary}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* LEFT COLUMN */}
          <div style={{ width: "65%", minWidth: "300px" }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>Experience</h2>
                {experience.map(exp => (
                  <div key={exp._id} style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold", color: accent }}>{exp.position}</h3>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500", marginBottom: "8px" }}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                    <ul style={{ paddingLeft: "16px", fontSize: "11px", color: "#334155", lineHeight: "1.6" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "4px" }}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {projects && projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>Projects</h2>
                {projects.map(proj => (
                  <div key={proj._id} style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{proj.description}</div>}
                    {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", color: "#777", fontStyle: "italic" }}>Tech: {proj.techStack.join(", ")}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ width: "35%", minWidth: "200px" }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>Skills</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.flatMap(s => s.items).map((item, i) => (
                    <span key={i} style={{ backgroundColor: `${accent}15`, color: accent, padding: "4px 10px", borderRadius: "12px", fontSize: "10px", fontWeight: "600" }}>{item.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>Education</h2>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CERTIFICATIONS */}
            {certifications && certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>Certifications</h2>
                {certifications.map(cert => (
                  <div key={cert._id} style={{ marginBottom: "10px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>{cert.issuer}</div>
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
ModernDesign2.displayName = "ModernDesign2";
export default ModernDesign2;