"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const HexagonTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#0891b2"; // Default cyan color

  // Skill bar component for this design
  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "10px", fontWeight: "bold", marginBottom: "4px", color: "#333", textTransform: "uppercase" }}>
        {name}
      </div>
      <div style={{ width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${level}%`, height: "100%", backgroundColor: accent, borderRadius: "3px" }} />
      </div>
    </div>
  );

  // Section Title with Icon (Dummy Icon for now)
  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", marginTop: "24px" }}>
      <div style={{ width: "24px", height: "24px", backgroundColor: accent, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" }}>
        <span style={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}>★</span>
      </div>
      <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#1e293b", margin: 0 }}>
        {title}
      </h2>
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
      
      {/* 🚀 LEFT SIDEBAR (Light Blue) 🚀 */}
      <div style={{ 
        width: "32%", 
        backgroundColor: "#f0f9ff", // Light cyan/blue background
        padding: "40px 24px",
        borderRight: "2px solid #e2e8f0",
        position: "relative"
      }}>
        
        {/* Hexagon Photo Placeholder */}
        <div style={{ 
          width: "140px", 
          height: "140px", 
          margin: "0 auto 30px auto",
          backgroundColor: "#fff",
          border: `3px solid ${accent}`,
          borderRadius: "20px", // Simulating hexagon-ish rounded box
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#cbd5e1",
          fontSize: "40px"
        }}>
          👤
        </div>

        {/* Contact Info */}
        <SectionTitle title="Contact" />
        <div style={{ fontSize: "11px", lineHeight: "2", color: "#475569", marginBottom: "24px" }}>
          {personal.phone && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📞 {personal.phone}</div>}
          {personal.email && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>✉️ {personal.email}</div>}
          {personal.location && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📍 {personal.location}</div>}
          {personal.linkedin && <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>in {personal.linkedin}</div>}
        </div>

        {/* Skills with Bars */}
        <SectionTitle title="Skills" />
        <div style={{ marginBottom: "24px" }}>
          {skills.length > 0 ? (
            skills.map((s) => (
              <div key={s._id} style={{ marginBottom: "12px" }}>
                 <SkillBar name={s.category} level={85} />
                 <div style={{ fontSize: "10px", color: "#64748b", marginTop: "-4px", marginBottom: "10px" }}>{s.items.join(", ")}</div>
              </div>
            ))
          ) : (
             <>
               <SkillBar name="Skill One" level={90} />
               <SkillBar name="Skill Two" level={75} />
               <SkillBar name="Skill Three" level={85} />
             </>
          )}
        </div>

        {/* Interests (Static as per image) */}
        <SectionTitle title="Interests" />
        <div style={{ fontSize: "11px", lineHeight: "2", color: "#475569" }}>
          <div>✈️ Travel</div>
          <div>🎵 Music</div>
          <div>📚 Reading</div>
        </div>
      </div>

      {/* 🚀 RIGHT MAIN CONTENT 🚀 */}
      <div style={{ width: "68%", padding: "40px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: accent, textTransform: "uppercase", lineHeight: "1.1" }}>
            {personal.fullName || "Robert Anderson"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>
            {personal.jobTitle || "Business Development Manager"}
          </p>
        </div>

        {/* Profile */}
        {personal.summary && (
          <div>
            <SectionTitle title="Professional Profile" />
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#475569" }}>{personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <SectionTitle title="Work Experience" />
            {experience.map((exp) => (
              <div key={exp._id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                     <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{exp.position}</h3>
                     <p style={{ fontSize: "11px", fontWeight: "600", color: accent }}>{exp.company}</p>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold", color: "#94a3b8" }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#475569", marginTop: "6px", lineHeight: "1.6" }}>
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <SectionTitle title="Education" />
            {education.map((edu) => (
              <div key={edu._id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                     <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{edu.degree} {edu.field}</h3>
                     <p style={{ fontSize: "11px", fontWeight: "600", color: accent }}>{edu.institution}</p>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold", color: "#94a3b8" }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});

HexagonTemplate.displayName = "HexagonTemplate";
export default HexagonTemplate;