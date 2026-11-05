"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#333";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  return (
    <div ref={ref} style={{ padding: "40px", minHeight: "1123px", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", ...textBreakStyle }}>
      <div style={{ border: "1px solid #e5e7eb", padding: "50px", minHeight: "1040px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: accent }}>{personal.fullName}</h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>{personal.jobTitle}</p>
        </div>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* LEFT SIDEBAR */}
          <div style={{ width: "35%", borderRight: "1px solid #f3f4f6", paddingRight: "30px", minWidth: "200px" }}>
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Contact</h2>
              <div style={{ fontSize: "11px", color: "#4b5563", lineHeight: "1.8" }}>
                {personal.email && <div>{personal.email}</div>}
                {personal.phone && <div>{personal.phone}</div>}
                {personal.location && <div>{personal.location}</div>}
              </div>
            </div>
            {skills.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Skills</h2>
                <div style={{ fontSize: "11px", color: "#4b5563", lineHeight: "1.8" }}>
                  {skills.flatMap(s => s.items).map(i => i.name).join(" • ")}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Education</h2>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "12px", fontSize: "11px" }}>
                    <div style={{ fontWeight: "bold", color: "#374151" }}>{edu.degree}</div>
                    <div style={{ color: "#6b7280" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Certifications</h2>
                {certifications.map(cert => (
                  <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px" }}>
                    <div style={{ fontWeight: "bold", color: "#374151" }}>{cert.name}</div>
                    <div style={{ color: "#6b7280" }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div style={{ width: "65%", minWidth: "300px" }}>
            {personal.summary && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Profile</h2>
                <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#4b5563" }}>{personal.summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Experience</h2>
                {experience.map(exp => (
                  <div key={exp._id} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#111827" }}>{exp.position}</h3>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>{exp.company}</div>
                    <ul style={{ paddingLeft: "14px", fontSize: "11px", color: "#4b5563", lineHeight: "1.6" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {projects && projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "12px" }}>Projects</h2>
                {projects.map(proj => (
                  <div key={proj._id} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "bold", color: "#111827" }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "2px" }}>{proj.description}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
MinDesign3.displayName = "MinDesign3";
export default MinDesign3;