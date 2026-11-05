"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0f172a";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      {/* Header */}
      <div style={{ backgroundColor: accent, color: "#fff", padding: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-1px" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>{personal.jobTitle}</p>
      </div>
      
      <div style={{ display: "flex", padding: "40px", flexWrap: "wrap" }}>
        {/* Left Column */}
        <div style={{ width: "65%", paddingRight: "40px", borderRight: "1px solid #eee", minWidth: "300px" }}>
           
           {/* 🚀 SUMMARY */}
           {personal.summary && (
             <div style={{ marginBottom: "32px" }}>
               <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>Summary</h2>
               <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
             </div>
           )}

           <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "16px", textTransform: "uppercase" }}>Experience</h2>
           {experience.map(exp => (
             <div key={exp._id} style={{ marginBottom: "20px" }}>
               <div style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</div>
               <div style={{ color: accent, fontWeight: "600" }}>{exp.company}</div>
               <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
               <ul style={{ paddingLeft: "16px", lineHeight: "1.6", color: "#444" }}>
                 {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
               </ul>
             </div>
           ))}

           {/* Projects */}
           {projects && projects.length > 0 && (
             <div style={{ marginTop: "24px" }}>
               <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "16px", textTransform: "uppercase" }}>Projects</h2>
               {projects.map(proj => (
                 <div key={proj._id} style={{ marginBottom: "16px" }}>
                   <div style={{ fontSize: "13px", fontWeight: "bold" }}>{proj.name}</div>
                   {proj.description && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{proj.description}</div>}
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Right Column */}
        <div style={{ width: "35%", paddingLeft: "40px", minWidth: "250px" }}>
           <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>Contact</h2>
           <div style={{ fontSize: "11px", lineHeight: "1.8", color: "#555", marginBottom: "24px" }}>
             {personal.email && <div>{personal.email}</div>}
             {personal.phone && <div>{personal.phone}</div>}
             {personal.location && <div>{personal.location}</div>}
           </div>

           <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>Education</h2>
           {education.map(edu => (
             <div key={edu._id} style={{ marginBottom: "12px", fontSize: "11px" }}>
               <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
               <div style={{ color: "#666" }}>{edu.institution}</div>
             </div>
           ))}

           {skills.length > 0 && (
             <div style={{ marginTop: "24px" }}>
               <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>Skills</h2>
               <div style={{ fontSize: "11px", color: "#555", lineHeight: "1.8" }}>
                 {skills.map(s => (
                   <div key={s._id} style={{ marginBottom: "6px" }}>
                     <span style={{ fontWeight: "bold" }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
                   </div>
                 ))}
               </div>
             </div>
           )}

           {certifications && certifications.length > 0 && (
             <div style={{ marginTop: "24px" }}>
               <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, marginBottom: "12px", textTransform: "uppercase" }}>Certifications</h2>
               {certifications.map(cert => (
                 <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px" }}>
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
ExecDesign2.displayName = "ExecDesign2";
export default ExecDesign2;