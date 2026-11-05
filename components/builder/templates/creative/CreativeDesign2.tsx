"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeDesign2 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e40af";

    const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

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
      display: "flex",
      minHeight: "1123px",
      fontFamily: data.fontFamily || "sans-serif",
      fontSize: data.fontSize || "11px",
      color: "#334155",
      ...textBreakStyle
    }}>

      {/* 🚀 LEFT SIDEBAR (Dark Blue) 🚀 */}
      <div style={{
        width: "32%",
        backgroundColor: accent,
        color: "#fff",
        padding: "40px 24px",
        position: "relative"
      }}>

        {/* Profile Photo (Circle Shape) */}
        <div style={{
          width: "130px",
          height: "130px",
          margin: "0 auto 30px auto",
          backgroundColor: "rgba(255,255,255,0.2)",
          border: "4px solid #fff", // White border
          borderRadius: "50%", // 🚀 Circle shape
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          position: "relative"
        }}>
          {personal.photoUrl ? (
            <img
              src={personal.photoUrl}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          ) : (
            <span style={{ color: "#fff", fontSize: "50px" }}>👤</span>
          )}
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {skills.flatMap(s => s.items).map((item, i) => (
                <div key={i} style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "4px", height: "4px", backgroundColor: "#fff", borderRadius: "50%" }}></span>
                  {item.name}
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
              {skills.flatMap(s => s.items).map((item, i) => (
                <SkillBar key={i} name={item.name} level={item.level} />
              ))}
            </div>
          </div>
        )}

        {/* 🚀 PROJECTS (Added) 🚀 */}
        {projects && projects.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", borderBottom: `2px solid ${accent}`, paddingBottom: "6px", marginBottom: "20px", display: "inline-block" }}>
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj._id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{proj.name}</h3>
                  {proj.link && <span style={{ fontSize: "10px", color: accent }}>{proj.link}</span>}
                </div>
                {proj.description && <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", lineHeight: "1.6" }}>{proj.description}</p>}
                {proj.techStack && proj.techStack.length > 0 && (
                  <p style={{ fontSize: "10px", color: "#94a3b8", fontStyle: "italic", marginTop: "2px" }}>
                    Tech: {proj.techStack.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

                {/* 🚀 CERTIFICATIONS 🚀 */}
        {certifications && certifications.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", borderBottom: `2px solid ${accent}`, paddingBottom: "6px", marginBottom: "20px", display: "inline-block" }}>
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert._id} style={{ marginBottom: "12px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>{cert.name}</h3>
                <p style={{ fontSize: "11px", color: "#64748b" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});

CreativeDesign2.displayName = "CreativeDesign2";
export default CreativeDesign2;