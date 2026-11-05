"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#db2777";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "0", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ backgroundColor: accent, padding: "50px", color: "#fff" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "900", letterSpacing: "-1px", lineHeight: "1" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "16px", marginTop: "8px", fontWeight: "500", opacity: 0.9 }}>{personal.jobTitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "11px", marginTop: "20px", opacity: 0.8 }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
        </div>
      </div>

      <div style={{ padding: "40px 50px" }}>
        
        {personal.summary && (
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#334155" }}>{personal.summary}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ width: "60%", minWidth: "300px" }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "900", color: "#111", textTransform: "uppercase", marginBottom: "16px" }}>Experience</h2>
                {experience.map(exp => (
                  <div key={exp._id} style={{ marginBottom: "24px", borderLeft: `2px solid ${accent}`, paddingLeft: "16px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>{exp.position}</div>
                    <div style={{ fontSize: "11px", color: accent, fontWeight: "600", marginBottom: "6px" }}>{exp.company}</div>
                    <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px", fontWeight: "bold" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                    <ul style={{ paddingLeft: "14px", fontSize: "11px", color: "#444", lineHeight: "1.6" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {projects && projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "900", color: "#111", textTransform: "uppercase", marginBottom: "16px" }}>Projects</h2>
                {projects.map(proj => (
                  <div key={proj._id} style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{proj.description}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: "40%", minWidth: "250px" }}>
            {skills.length > 0 && (
              <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "900", color: "#111", textTransform: "uppercase", marginBottom: "16px" }}>Skills</h2>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold", color: accent }}>{s.category}</div>
                    <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>{s.items.map(i => i.name).join(" • ")}</div>
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "900", color: "#111", textTransform: "uppercase", marginBottom: "16px" }}>Education</h2>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold" }}>{edu.degree}</div>
                    <div style={{ fontSize: "10px", color: "#555" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "12px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "900", color: "#111", textTransform: "uppercase", marginBottom: "16px" }}>Certifications</h2>
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
      </div>
    </div>
  );
});
ModernDesign4.displayName = "ModernDesign4";
export default ModernDesign4;