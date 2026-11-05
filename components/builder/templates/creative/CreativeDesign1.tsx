"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#374151";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", color: "#334155", display: "flex", flexDirection: "column", ...textBreakStyle }}>
      
      {/* TOP SPLIT HEADER */}
      <div style={{ display: "flex", height: "180px" }}>
        <div style={{ width: "35%", backgroundColor: "transparent", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "20px" }}>
          <div style={{ width: "140px", height: "140px", borderRadius: "50%", backgroundColor: "#f1f5f9", border: `6px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt={personal.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "60px", color: "#94a3b8" }}>👤</span>
            )}
          </div>
        </div>

        <div style={{ width: "65%", backgroundColor: accent, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "900", lineHeight: "1.1", letterSpacing: "2px" }}>{personal.fullName}</h1>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "rgba(255,255,255,0.8)", marginTop: "6px", letterSpacing: "1px" }}>{personal.jobTitle}</p>
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={{ display: "flex", flex: 1, backgroundColor: "transparent" }}>
        {/* LEFT SIDEBAR */}
        <div style={{ width: "35%", backgroundColor: "#f1f5f9", padding: "30px", display: "flex", flexDirection: "column", gap: "28px" }}>
          
          <div>
            <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}><span>📞</span> Contact</h2>
            <div style={{ fontSize: "11px", lineHeight: "2", color: "#475569" }}>
              {personal.phone && <div>{personal.phone}</div>}
              {personal.email && <div>{personal.email}</div>}
              {personal.location && <div>{personal.location}</div>}
              {personal.linkedin && <div>in {personal.linkedin}</div>}
              {personal.website && <div>{personal.website}</div>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}><span>⚙️</span> Skills</h2>
              <ul style={{ listStyleType: "none", padding: 0, fontSize: "11px", lineHeight: "2", color: "#475569" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", backgroundColor: accent, borderRadius: "50%" }} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}><span>🎓</span> Education</h2>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{edu.degree}</div>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{edu.institution}</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}><span>🏆</span> Certifications</h2>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ width: "65%", padding: "30px 40px", backgroundColor: "#fff" }}>
          
          {personal.summary && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>About Me</h2>
              <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#475569" }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", marginBottom: "12px" }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</div>
                  <div style={{ fontSize: "11px", color: accent, fontWeight: "600" }}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                  <ul style={{ fontSize: "11px", color: "#475569", paddingLeft: "14px", marginTop: "4px", lineHeight: "1.5" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", textTransform: "uppercase", marginBottom: "12px" }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{proj.name}</div>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{proj.description}</div>
                  {proj.techStack && proj.techStack.length > 0 && <div style={{ fontSize: "10px", color: "#64748b", fontStyle: "italic" }}>Tech: {proj.techStack.join(", ")}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
CreativeDesign1.displayName = "CreativeDesign1";
export default CreativeDesign1;