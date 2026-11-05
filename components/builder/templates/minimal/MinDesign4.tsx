"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#ef4444";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "60px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "4px solid #000", paddingBottom: "20px", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "42px", fontWeight: "900", lineHeight: "0.9", letterSpacing: "-2px", textTransform: "uppercase" }}>{personal.fullName}</h1>
          <p style={{ fontSize: "14px", fontWeight: "bold", color: accent, marginTop: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>{personal.jobTitle}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "10px", fontWeight: "bold", lineHeight: "1.6" }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
        <div>
           {personal.summary && (
             <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Profile</h2>
                <p style={{ fontSize: "11px", lineHeight: "1.6", fontWeight: "500" }}>{personal.summary}</p>
             </div>
           )}
           {education.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Education</h2>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "11px" }}>{edu.degree}</div>
                    <div style={{ fontSize: "10px", color: "#555" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
           )}
           {skills.length > 0 && (
             <div>
               <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Skills</h2>
               <div style={{ fontSize: "11px", lineHeight: "1.8" }}>
                 {skills.map(s => (
                   <div key={s._id} style={{ marginBottom: "4px" }}>{s.category}: {s.items.map(i => i.name).join(", ")}</div>
                 ))}
               </div>
             </div>
           )}
        </div>
        <div>
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</h3>
                    <span style={{ fontSize: "10px", fontWeight: "bold", color: accent }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>{exp.company}</div>
                  <ul style={{ paddingLeft: "14px", fontSize: "11px", lineHeight: "1.6", color: "#333" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", color: "#444" }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px", borderBottom: "1px solid #000", paddingBottom: "4px" }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#555" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
MinDesign4.displayName = "MinDesign4";
export default MinDesign4;