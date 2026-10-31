"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernCorporateTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills } = data;
  const accent = data.accentColor || "#374151"; // Dark Slate Gray

  return (
    <div ref={ref} style={{ 
      backgroundColor: "#fff", 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "sans-serif", 
      fontSize: data.fontSize || "11px",
      color: "#334155",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* 🚀 TOP SPLIT HEADER 🚀 */}
      <div style={{ display: "flex", height: "180px" }}>
        
        {/* Left White Box (Profile Photo) */}
        <div style={{ 
          width: "35%", 
          backgroundColor: "#fff", 
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "center",
          paddingBottom: "20px"
        }}>
          <div style={{ 
            width: "140px", 
            height: "140px", 
            borderRadius: "50%", 
            backgroundColor: "#f1f5f9",
            border: `6px solid ${accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <span style={{ fontSize: "60px", color: "#94a3b8" }}>👤</span>
          </div>
        </div>

        {/* Right Dark Box (Name & Title) */}
        <div style={{ 
          width: "65%", 
          backgroundColor: accent, 
          color: "#fff", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          paddingLeft: "40px"
        }}>
          <h1 style={{ fontSize: "36px", fontWeight: "900", lineHeight: "1.1", letterSpacing: "2px" }}>
            {personal.fullName || "Adam Fletcher"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "rgba(255,255,255,0.8)", marginTop: "6px", letterSpacing: "1px" }}>
            {personal.jobTitle || "Graphics Designer"}
          </p>
        </div>
      </div>

      {/* 🚀 MAIN BODY (2 Columns) 🚀 */}
      <div style={{ display: "flex", flex: 1, backgroundColor: "#f8fafc" }}>
        
        {/* LEFT SIDEBAR (Light Gray) */}
        <div style={{ 
          width: "35%", 
          backgroundColor: "#f1f5f9", 
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "28px"
        }}>
          
          {/* About Me */}
          {personal.summary && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span>👤</span> About Me
              </h2>
              <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569" }}>{personal.summary}</p>
            </div>
          )}

          {/* Contact */}
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span>📞</span> Contact
            </h2>
            <div style={{ fontSize: "11px", lineHeight: "2", color: "#475569" }}>
              {personal.phone && <div>{personal.phone}</div>}
              {personal.email && <div>{personal.email}</div>}
              {personal.location && <div>{personal.location}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span>⚙️</span> Skills
              </h2>
              <ul style={{ listStyleType: "none", padding: 0, fontSize: "11px", lineHeight: "2", color: "#475569" }}>
                {skills.flatMap(s => s.items).filter(Boolean).map((skill, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", backgroundColor: accent, borderRadius: "50%" }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT CONTENT (White) */}
        <div style={{ width: "65%", padding: "30px 40px", backgroundColor: "#fff" }}>
          
          {/* Education (Timeline) */}
          {education.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>
                <span>🎓</span> Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {education.map((edu) => (
                  <div key={edu._id} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b", minWidth: "80px" }}>
                      [{edu.startDate} - {edu.endDate}]
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase" }}>{edu.institution}</div>
                      <div style={{ fontSize: "11px", color: "#475569" }}>{edu.degree} {edu.field}</div>
                      {edu.grade && <div style={{ fontSize: "10px", color: accent, marginTop: "2px" }}>GPA: {edu.grade}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience (Timeline) */}
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>
                <span>💼</span> Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {experience.map((exp) => (
                  <div key={exp._id} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b", minWidth: "80px" }}>
                      [{exp.startDate} - {exp.current ? "Present" : exp.endDate}]
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase" }}>{exp.position}</div>
                      <div style={{ fontSize: "11px", fontWeight: "600", color: accent }}>{exp.company}</div>
                      <ul style={{ fontSize: "11px", color: "#475569", paddingLeft: "14px", marginTop: "6px", lineHeight: "1.5" }}>
                        {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

ModernCorporateTemplate.displayName = "ModernCorporateTemplate";
export default ModernCorporateTemplate;