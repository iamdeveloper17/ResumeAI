"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const VibrantTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#065f46"; // Default Dark Green

  // Section Header Component
  const SectionHeader = ({ title, icon, isLeft }: { title: string; icon: string; isLeft?: boolean }) => (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: isLeft ? "flex-start" : "flex-start",
      marginBottom: "20px",
      marginTop: "10px"
    }}>
      <div style={{ 
        backgroundColor: "#f59e0b", // Orange color
        color: "#fff",
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <span>{icon}</span>
        {title}
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
      color: "#334155",
      position: "relative"
    }}>
      
      {/* Top Left Yellow Accent Line */}
      <div style={{ position: "absolute", top: "40px", left: "20px", width: "4px", height: "80px", backgroundColor: "#f59e0b", borderRadius: "2px" }} />
      {/* Top Right Pink Accent Line */}
      <div style={{ position: "absolute", top: "40px", right: "20px", width: "4px", height: "80px", backgroundColor: "#ec4899", borderRadius: "2px" }} />

      {/* 🚀 LEFT SIDEBAR (Dark Green) 🚀 */}
      <div style={{ 
        width: "35%", 
        backgroundColor: accent, 
        color: "#fff",
        padding: "60px 30px 40px 30px",
        display: "flex",
        flexDirection: "column"
      }}>
        
        {/* Circular Profile Photo */}
        <div style={{ 
          width: "160px", 
          height: "160px", 
          margin: "0 auto 40px auto",
          border: "4px solid #f59e0b", // Orange border
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
        }}>
          {/* Placeholder Image/Icon */}
          <span style={{ fontSize: "60px", color: "#cbd5e1" }}>👤</span>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span>👤</span> My Contact
          </h2>
          <div style={{ fontSize: "11px", lineHeight: "2.2", opacity: 0.9, display: "flex", flexDirection: "column", gap: "10px" }}>
            {personal.location && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>📍 {personal.location}</div>}
            {personal.phone && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>📞 {personal.phone}</div>}
            {personal.website && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>🌐 {personal.website}</div>}
            {personal.email && <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>✉️ {personal.email}</div>}
          </div>
        </div>

        {/* Skills with Orange Bars */}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span>⚙️</span> My Skills
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {skills.flatMap(s => s.items).filter(Boolean).map((skill, i) => (
                <div key={i}>
                  <div style={{ fontSize: "11px", fontWeight: "600", marginBottom: "6px" }}>{skill}</div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${75 + (i * 5) % 20}%`, height: "100%", backgroundColor: "#f59e0b", borderRadius: "3px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🚀 RIGHT MAIN CONTENT (White) 🚀 */}
      <div style={{ width: "65%", padding: "60px 40px 40px 40px", backgroundColor: "#fff" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "900", color: accent, lineHeight: "1.1" }}>
            {personal.fullName || "Abigail Turner"}
          </h1>
          <p style={{ fontSize: "16px", fontWeight: "500", color: "#64748b", marginTop: "8px" }}>
            {personal.jobTitle || "Professional Designer"}
          </p>
        </div>

        {/* Education Section (Top) */}
        {education.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <SectionHeader title="Education Background" icon="🎓" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "10px" }}>
              {education.map((edu) => (
                <div key={edu._id} style={{ position: "relative", paddingLeft: "20px", borderLeft: "2px solid #e2e8f0" }}>
                  <div style={{ position: "absolute", left: "-5px", top: "5px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{edu.degree}</h3>
                    <span style={{ fontSize: "9px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "2px 8px", borderRadius: "10px" }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience Section (Bottom) */}
        {experience.length > 0 && (
          <div>
            <SectionHeader title="Work Experience" icon="💼" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "10px" }}>
              {experience.map((exp) => (
                <div key={exp._id} style={{ position: "relative", paddingLeft: "20px", borderLeft: "2px solid #e2e8f0" }}>
                  <div style={{ position: "absolute", left: "-5px", top: "5px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{exp.position}</h3>
                    <span style={{ fontSize: "9px", fontWeight: "bold", backgroundColor: accent, color: "#fff", padding: "2px 8px", borderRadius: "10px" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: accent, marginTop: "4px", fontWeight: "600" }}>{exp.company}</p>
                  <ul style={{ fontSize: "10px", color: "#64748b", paddingLeft: "14px", marginTop: "6px", lineHeight: "1.6" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "2px" }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

VibrantTemplate.displayName = "VibrantTemplate";
export default VibrantTemplate;