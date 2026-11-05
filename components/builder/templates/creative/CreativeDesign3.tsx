"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  // 🚀 Saare fields destructure karo
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1e293b";

  // 🚀 Text break fix
  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  const SectionTitle = ({ title, isLeft }: { title: string; isLeft?: boolean }) => (
    <div style={{ marginBottom: "16px", borderBottom: `2px solid ${isLeft ? "#fff" : accent}`, paddingBottom: "8px" }}>
      <h2 style={{ fontSize: "14px", fontWeight: "bold", color: isLeft ? "#fff" : accent, textTransform: "uppercase", letterSpacing: "1px" }}>
        {title}
      </h2>
    </div>
  );

  return (
    <div ref={ref} style={{
      minHeight: "1123px",
      fontFamily: data.fontFamily || "sans-serif",
      fontSize: data.fontSize || "11px",
      color: "#334155",
      display: "flex",
      flexDirection: "column",
      ...textBreakStyle // 🚀 Apply kiya
    }}>

      {/* 🚀 TOP HEADER (Dark) 🚀 */}
      <div style={{ backgroundColor: accent, color: "#fff", padding: "40px", display: "flex", alignItems: "center", gap: "32px" }}>
        <div style={{
          width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          border: "4px solid rgba(255,255,255,0.2)", flexShrink: 0
        }}>
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "60px", color: "#cbd5e1" }}>👤</span>
          )}
        </div>

        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", lineHeight: "1.1", letterSpacing: "1px" }}>
            {personal.fullName || "Adeline Palmerston"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "2px", marginTop: "8px" }}>
            {personal.jobTitle || "Graphic Designer"}
          </p>
        </div>
      </div>

      {/* 🚀 CONTACT BAR 🚀 */}
      <div style={{ backgroundColor: "#334155", color: "#e2e8f0", padding: "12px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", fontSize: "11px" }}>
        {personal.phone && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>📞 {personal.phone}</div>}
        {personal.email && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>✉️ {personal.email}</div>}
        {personal.website && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>🌐 {personal.website}</div>}
        {personal.location && <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>📍 {personal.location}</div>}
      </div>

      {/* 🚀 MAIN BODY 🚀 */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: "32%", backgroundColor: "#475569", color: "#fff", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "32px" }}>

          {/* EDUCATION */}
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

          {/* CERTIFICATIONS (Real Data) */}
          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle title="Certifications" isLeft />
              <ul style={{ listStyleType: "disc", paddingLeft: "16px", fontSize: "11px", color: "#cbd5e1", lineHeight: "1.8" }}>
                {certifications.map(cert => (
                  <li key={cert._id} style={{ marginBottom: "6px" }}>
                    <strong>{cert.name}</strong>
                    <div style={{ fontSize: "10px", opacity: 0.8 }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div>
              <SectionTitle title="Skills" isLeft />
              <ul style={{ listStyleType: "disc", paddingLeft: "16px", fontSize: "11px", color: "#cbd5e1", lineHeight: "2" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT CONTENT */}
        <div style={{ width: "68%", padding: "32px 40px", backgroundColor: "#fff" }}>

          {/* SUMMARY */}
          {personal.summary && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle title="About me" />
              <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#475569" }}>{personal.summary}</p>
            </div>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle title="Experience" />
              {experience.map((exp) => (
                <div key={exp._id} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
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

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <div>
              <SectionTitle title="Projects" />
              {projects.map((proj) => (
                <div key={proj._id} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>{proj.name}</h3>
                    {proj.link && <span style={{ fontSize: "10px", color: accent }}>{proj.link}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: "11px", color: "#475569", marginTop: "4px", lineHeight: "1.6" }}>{proj.description}</p>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <p style={{ fontSize: "10px", color: "#94a3b8", fontStyle: "italic", marginTop: "2px" }}>
                      Tech: {proj.techStack.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

CreativeDesign3.displayName = "CreativeDesign3";
export default CreativeDesign3;