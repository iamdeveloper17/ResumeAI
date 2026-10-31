"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecutiveEliteTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#1e293b"; // Default Dark Slate

  // Reusable Section Title Component
  const SectionTitle = ({ title, isLeft }: { title: string; isLeft?: boolean }) => (
    <div style={{ 
      marginBottom: "16px", 
      borderBottom: `2px solid ${isLeft ? "#fff" : accent}`,
      paddingBottom: "8px"
    }}>
      <h2 style={{ 
        fontSize: "14px", 
        fontWeight: "bold", 
        color: isLeft ? "#fff" : accent,
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}>
        {title}
      </h2>
    </div>
  );

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
      
      {/* 🚀 TOP HEADER (Dark) 🚀 */}
      <div style={{ 
        backgroundColor: accent, 
        color: "#fff", 
        padding: "40px",
        display: "flex",
        alignItems: "center",
        gap: "32px"
      }}>
        {/* Profile Photo Placeholder */}
        <div style={{ 
          width: "120px", 
          height: "120px", 
          borderRadius: "50%", 
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "4px solid rgba(255,255,255,0.2)",
          flexShrink: 0
        }}>
           <span style={{ fontSize: "60px", color: "#cbd5e1" }}>👤</span>
        </div>

        {/* Name & Title */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", lineHeight: "1.1", letterSpacing: "1px" }}>
            {personal.fullName || "Adeline Palmerston"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "2px", marginTop: "8px" }}>
            {personal.jobTitle || "Graphic Designer"}
          </p>
        </div>
      </div>

      {/* 🚀 CONTACT BAR (Mid Dark) 🚀 */}
      <div style={{ 
        backgroundColor: "#334155", // Slightly lighter than header
        color: "#e2e8f0", 
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        fontSize: "11px"
      }}>
        {personal.phone && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>📞 {personal.phone}</div>}
        {personal.email && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>✉️ {personal.email}</div>}
        {personal.website && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>🌐 {personal.website}</div>}
        {personal.location && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>📍 {personal.location}</div>}
      </div>

      {/* 🚀 MAIN BODY (2 Columns) 🚀 */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* LEFT SIDEBAR (Dark Slate) */}
        <div style={{ 
          width: "32%", 
          backgroundColor: "#475569", // Slate color
          color: "#fff",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>
          
          {/* Education */}
          {education.length > 0 && (
            <div>
              <SectionTitle title="Education" isLeft />
              {education.map((edu) => (
                <div key={edu._id} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "4px" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications (Dummy data for now) */}
          <div>
            <SectionTitle title="Certifications" isLeft />
            <ul style={{ listStyleType: "disc", paddingLeft: "16px", fontSize: "11px", color: "#cbd5e1", lineHeight: "1.8" }}>
              <li>Certified Graphic Designer</li>
              <li>UX Experience (2012) Certificate</li>
            </ul>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SectionTitle title="Skills" isLeft />
              <ul style={{ listStyleType: "disc", paddingLeft: "16px", fontSize: "11px", color: "#cbd5e1", lineHeight: "2" }}>
                {skills.flatMap(s => s.items).filter(Boolean).map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Language (Dummy data) */}
          <div>
             <SectionTitle title="Language" isLeft />
             <ul style={{ listStyleType: "none", paddingLeft: "0", fontSize: "11px", color: "#cbd5e1", lineHeight: "2" }}>
               <li>French</li>
               <li>Spanish</li>
               <li>English</li>
             </ul>
          </div>
        </div>

        {/* RIGHT CONTENT (White) */}
        <div style={{ width: "68%", padding: "32px 40px", backgroundColor: "#fff" }}>
          
          {/* About Me */}
          {personal.summary && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle title="About me" />
              <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#475569" }}>{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle title="Experience" />
              {experience.map((exp) => (
                <div key={exp._id} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{exp.position}</h3>
                    <span style={{ fontSize: "10px", fontWeight: "bold", color: "#94a3b8" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", fontWeight: "600", color: accent, marginTop: "2px", marginBottom: "6px" }}>{exp.company}</p>
                  <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#475569", lineHeight: "1.6" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Reference (Dummy Data) */}
          <div>
            <SectionTitle title="Reference" />
            <div style={{ display: "flex", gap: "40px", fontSize: "11px" }}>
              <div>
                <p style={{ fontWeight: "bold", color: "#1e293b" }}>Alfredo Torres</p>
                <p style={{ color: "#64748b" }}>Director</p>
                <p style={{ color: "#64748b" }}>Ateliers & Partners</p>
                <p style={{ color: accent, marginTop: "4px" }}>+123-456-7890</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold", color: "#1e293b" }}>Houston Kalyani</p>
                <p style={{ color: "#64748b" }}>CEO</p>
                <p style={{ color: "#64748b" }}>Ingoude Company</p>
                <p style={{ color: accent, marginTop: "4px" }}>+123-456-7890</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

ExecutiveEliteTemplate.displayName = "ExecutiveEliteTemplate";
export default ExecutiveEliteTemplate;