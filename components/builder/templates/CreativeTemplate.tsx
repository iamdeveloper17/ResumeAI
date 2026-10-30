"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#8b5cf6";

  return (
    <div ref={ref} style={{ backgroundColor: "#fff", display: "flex", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", }}>
      {/* Left Sidebar */}
      <div style={{ width: "35%", backgroundColor: accent, color: "#fff", padding: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", lineHeight: "1.2", marginBottom: "8px" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "32px" }}>{personal.jobTitle}</p>
        
        <div style={{ fontSize: "11px", lineHeight: "1.8", marginBottom: "32px" }}>
          {personal.email && <div>✉ {personal.email}</div>}
          {personal.phone && <div>📞 {personal.phone}</div>}
          {personal.location && <div>📍 {personal.location}</div>}
        </div>

        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px", marginBottom: "12px" }}>Skills</h2>
            {skills.map((s) => (
               <div key={s._id} style={{ marginBottom: "8px" }}>
                 <div style={{ fontSize: "11px", fontWeight: "bold" }}>{s.category}</div>
                 <div style={{ fontSize: "10px", opacity: 0.8 }}>{s.items.join(", ")}</div>
               </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: "65%", padding: "40px" }}>
        {personal.summary && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "8px" }}>About Me</h2>
            <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "12px" }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp._id} style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</div>
                <div style={{ fontSize: "11px", color: accent, fontWeight: "bold" }}>{exp.company}</div>
                <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#555" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
CreativeTemplate.displayName = "CreativeTemplate";
export default CreativeTemplate;