"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#059669";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
       <div style={{ display: "flex", borderBottom: `10px solid ${accent}`, flexWrap: "wrap" }}>
         <div style={{ width: "50%", padding: "40px" }}>
           <h1 style={{ fontSize: "32px", fontWeight: "900", color: accent, lineHeight: "1" }}>{personal.fullName}</h1>
           <p style={{ fontSize: "14px", color: "#333", marginTop: "8px", fontWeight: "bold" }}>{personal.jobTitle}</p>
         </div>
         <div style={{ width: "50%", padding: "40px", textAlign: "right", fontSize: "11px", color: "#555", lineHeight: "1.8" }}>
           {personal.email && <div>{personal.email}</div>}
           {personal.phone && <div>{personal.phone}</div>}
           {personal.location && <div>{personal.location}</div>}
         </div>
       </div>

       <div style={{ padding: "40px" }}>
         
         {/* 🚀 SUMMARY */}
         {personal.summary && (
           <div style={{ marginBottom: "32px" }}>
             <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>SUMMARY</h2>
             <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
           </div>
         )}

         <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>EXPERIENCE</h2>
         {experience.map(exp => (
           <div key={exp._id} style={{ marginBottom: "24px" }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
               <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>{exp.position} <span style={{ color: accent }}>at {exp.company}</span></h3>
               <span style={{ fontSize: "10px", fontWeight: "bold", color: "#666" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
             </div>
             <ul style={{ paddingLeft: "16px", marginTop: "8px", lineHeight: "1.6", color: "#444" }}>
               {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
             </ul>
           </div>
         ))}

         {education.length > 0 && (
           <div style={{ marginTop: "32px" }}>
             <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>EDUCATION</h2>
             {education.map(edu => (
               <div key={edu._id} style={{ marginBottom: "12px" }}>
                 <div style={{ fontSize: "13px", fontWeight: "bold" }}>{edu.degree}</div>
                 <div style={{ fontSize: "11px", color: "#555" }}>{edu.institution} | {edu.startDate} - {edu.endDate}</div>
               </div>
             ))}
           </div>
         )}

         {skills.length > 0 && (
           <div style={{ marginTop: "32px" }}>
             <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>SKILLS</h2>
             <div style={{ fontSize: "11px", color: "#444", lineHeight: "1.8" }}>
               {skills.map(s => (
                 <div key={s._id} style={{ marginBottom: "6px" }}>
                   <span style={{ fontWeight: "bold" }}>{s.category}:</span> {s.items.map(i => i.name).join(", ")}
                 </div>
               ))}
             </div>
           </div>
         )}

         {projects && projects.length > 0 && (
           <div style={{ marginTop: "32px" }}>
             <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>PROJECTS</h2>
             {projects.map(proj => (
               <div key={proj._id} style={{ marginBottom: "12px" }}>
                 <div style={{ fontSize: "13px", fontWeight: "bold" }}>{proj.name}</div>
                 {proj.description && <div style={{ fontSize: "11px", color: "#555" }}>{proj.description}</div>}
               </div>
             ))}
           </div>
         )}

         {certifications && certifications.length > 0 && (
           <div style={{ marginTop: "32px" }}>
             <h2 style={{ fontSize: "14px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "4px 10px", display: "inline-block", marginBottom: "16px" }}>CERTIFICATIONS</h2>
             {certifications.map(cert => (
               <div key={cert._id} style={{ marginBottom: "10px" }}>
                 <div style={{ fontSize: "12px", fontWeight: "bold" }}>{cert.name}</div>
                 <div style={{ fontSize: "10px", color: "#555" }}>{cert.issuer}</div>
               </div>
             ))}
           </div>
         )}
       </div>
    </div>
  );
});
ExecDesign4.displayName = "ExecDesign4";
export default ExecDesign4;