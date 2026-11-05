"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#666";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "80px 100px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", color: "#000", ...textBreakStyle }}>
       <div style={{ marginBottom: "50px" }}>
         <h1 style={{ fontSize: "24px", fontWeight: "normal", letterSpacing: "1px" }}>{personal.fullName}</h1>
         <p style={{ fontSize: "12px", color: accent, marginTop: "4px" }}>{personal.jobTitle}</p>
       </div>

       <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {personal.summary && (
            <p style={{ lineHeight: "1.8", color: "#333", maxWidth: "90%" }}>{personal.summary}</p>
          )}

          <div style={{ borderTop: "1px solid #eee", paddingTop: "32px" }}>
            <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp._id} style={{ display: "flex", gap: "32px", marginBottom: "24px" }}>
                <div style={{ width: "120px", flexShrink: 0, fontSize: "10px", color: "#666" }}>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
                <div>
                   <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "2px" }}>{exp.position}</h3>
                   <p style={{ fontSize: "11px", color: accent, marginBottom: "8px" }}>{exp.company}</p>
                   <ul style={{ paddingLeft: "14px", fontSize: "11px", color: "#444", lineHeight: "1.6" }}>
                     {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                   </ul>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "32px" }}>
             <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Education</h2>
             {education.map(edu => (
               <div key={edu._id} style={{ display: "flex", gap: "32px", marginBottom: "16px" }}>
                 <div style={{ width: "120px", flexShrink: 0, fontSize: "10px", color: "#666" }}>
                   {edu.startDate} - {edu.endDate}
                 </div>
                 <div>
                   <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</h3>
                   <p style={{ fontSize: "11px", color: accent }}>{edu.institution}</p>
                 </div>
               </div>
             ))}
          </div>

          {skills.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", paddingTop: "32px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Skills</h2>
              <div style={{ fontSize: "11px", color: "#444", lineHeight: "1.8" }}>
                {skills.map(s => (
                  <div key={s._id} style={{ marginBottom: "4px" }}>{s.category}: {s.items.map(i => i.name).join(", ")}</div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", paddingTop: "32px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "11px", color: "#444" }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div style={{ borderTop: "1px solid #eee", paddingTop: "32px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#666" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
       </div>
    </div>
  );
});
MinDesign5.displayName = "MinDesign5";
export default MinDesign5;