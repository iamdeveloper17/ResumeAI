"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  // 🚀 Saare fields destructure karo
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0891b2";

  // 🚀 Text break fix
  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

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
      display: "flex",
      minHeight: "1123px",
      fontFamily: data.fontFamily || "sans-serif",
      fontSize: data.fontSize || "11px",
      color: "#334155",
      ...textBreakStyle // 🚀 Apply kiya
    }}>

      {/* 🚀 LEFT SIDEBAR (Light Blue) 🚀 */}
      <div style={{ width: "32%", backgroundColor: "#f0f9ff", padding: "40px 24px", borderRight: "2px solid #e2e8f0", position: "relative" }}>

        {/* Hexagon Photo */}
        <div style={{
          width: "140px", height: "140px", margin: "0 auto 30px auto", backgroundColor: "#fff",
          border: `3px solid ${accent}`, borderRadius: "20px", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#cbd5e1", fontSize: "40px", overflow: "hidden", position: "relative"
        }}>
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>👤</span>
          )}
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
          {skills.flatMap(s => s.items).map((item, i) => (
            <div key={i} style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ width: "4px", height: "4px", backgroundColor: accent, borderRadius: "50%" }}></span>
              {item.name}
            </div>
          ))}
        </div>

        {/* 🚀 CERTIFICATIONS (Real Data) 🚀 */}
        {certifications && certifications.length > 0 && (
          <div>
            <SectionTitle title="Certifications" />
            <div style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569" }}>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "8px" }}>
                  <div style={{ fontWeight: "bold" }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🚀 RIGHT MAIN CONTENT 🚀 */}
      <div style={{ width: "68%", padding: "40px" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: accent, textTransform: "uppercase", lineHeight: "1.1" }}>
            {personal.fullName || "Robert Anderson"}
          </h1>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>
            {personal.jobTitle || "Business Development Manager"}
          </p>
        </div>

        {personal.summary && (
          <div>
            <SectionTitle title="Professional Profile" />
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#475569" }}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <SectionTitle title="Work Experience" />
            {experience.map((exp) => (
              <div key={exp._id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
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

        {education.length > 0 && (
          <div>
            <SectionTitle title="Education" />
            {education.map((edu) => (
              <div key={edu._id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
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

        {/* 🚀 PROJECTS (Real Data) 🚀 */}
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
  );
});

CreativeDesign4.displayName = "CreativeDesign4";
export default CreativeDesign4;