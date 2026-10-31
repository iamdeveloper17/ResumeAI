"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const DynamicTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#1e40af"; // Default Deep Blue

  // Helper for Skill Bars
  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: "600", marginBottom: "4px", color: "#333", textTransform: "uppercase" }}>
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div style={{ width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${level}%`, height: "100%", backgroundColor: accent, borderRadius: "3px" }} />
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ 
      backgroundColor: "#fff", 
      display: "flex", 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "sans-serif", 
      fontSize: data.fontSize || "11px",
      color: "#334155"
    }}>
      
      {/* 🚀 LEFT SIDEBAR (Dark Blue) 🚀 */}
      <div style={{ 
        width: "32%", 
        backgroundColor: accent, 
        color: "#fff",
        padding: "40px 24px",
        position: "relative"
      }}>
        
        {/* Profile Photo Placeholder (Diamond Shape) */}
        <div style={{ 
          width: "120px", 
          height: "120px", 
          margin: "0 auto 30px auto",
          backgroundColor: "rgba(255,255,255,0.2)",
          border: "4px solid #fff",
          transform: "rotate(45deg)", // 🚀 Diamond shape
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px"
        }}>
          <span style={{ transform: "rotate(-45deg)", color: "#fff", fontSize: "40px" }}>👤</span>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px", marginBottom: "16px" }}>Contact Us</h2>
          <div style={{ fontSize: "11px", lineHeight: "2", opacity: 0.9 }}>
            {personal.phone && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📞 {personal.phone}</div>}
            {personal.email && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>✉️ {personal.email}</div>}
            {personal.location && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📍 {personal.location}</div>}
            {personal.website && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>🌐 {personal.website}</div>}
          </div>
        </div>

        {/* Education (Sidebar) */}
        {education.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px", marginBottom: "16px" }}>Education</h2>
            {education.map((edu) => (
              <div key={edu._id} style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</div>
                <div style={{ fontSize: "10px", opacity: 0.8 }}>{edu.institution}</div>
                <div style={{ fontSize: "9px", opacity: 0.7, marginTop: "2px" }}>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* Expertise / Skills (Sidebar) */}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "8px", marginBottom: "16px" }}>Expertise</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {skills.flatMap(s => s.items).filter(Boolean).map((skill, i) => (
                <div key={i} style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "4px", height: "4px", backgroundColor: "#fff", borderRadius: "50%" }}></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🚀 RIGHT MAIN CONTENT 🚀 */}
      <div style={{ width: "68%", padding: "48px 40px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", lineHeight: "1.1", letterSpacing: "1px" }}>
            {personal.fullName || "Kathy Alvarez"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "600", color: accent, textTransform: "uppercase", letterSpacing: "2px", marginTop: "6px" }}>
            {personal.jobTitle || "Creative Designer"}
          </p>
        </div>

        {/* Profile Summary */}
        {personal.summary && (
          <div style={{ marginBottom: "32px" }}>
             <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#64748b" }}>{personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", borderBottom: `2px solid ${accent}`, paddingBottom: "6px", marginBottom: "20px", display: "inline-block" }}>
              Work Experiences
            </h2>
            {experience.map((exp) => (
              <div key={exp._id} style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                     <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{exp.position}</h3>
                     <p style={{ fontSize: "11px", fontWeight: "600", color: accent }}>{exp.company}</p>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold", color: "#94a3b8", backgroundColor: "#f1f5f9", padding: "2px 8px", borderRadius: "10px" }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#64748b", lineHeight: "1.7", listStyleType: "disc" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "4px" }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Skills (Right side bar chart style) */}
        {skills.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", borderBottom: `2px solid ${accent}`, paddingBottom: "6px", marginBottom: "20px", display: "inline-block" }}>
              Skills
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {skills.flatMap(s => s.items).filter(Boolean).map((skill, i) => (
                 <SkillBar key={i} name={skill} level={70 + (i * 5) % 30} /> // Dummy random level for bars
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

DynamicTemplate.displayName = "DynamicTemplate";
export default DynamicTemplate;