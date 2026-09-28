"use client";

import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate = forwardRef<HTMLDivElement, ClassicTemplateProps>(
  ({ data }, ref) => {
    const { personal, experience, education, skills, projects } = data;
    const accent = data.accentColor || "#1f2937";

    const formatDate = (date: string): string => {
      if (!date) return "";
      const parts = date.split("-");
      const year = parts[0];
      const month = parts[1];
      if (!year || !month) return date;
      const d = new Date(parseInt(year), parseInt(month) - 1);
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    const hasAnyData =
      personal.fullName ||
      personal.jobTitle ||
      personal.email ||
      personal.summary ||
      experience.length > 0 ||
      education.length > 0 ||
      skills.length > 0 ||
      projects.length > 0;

    return (
      <div
        ref={ref}
        id="resume-preview"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          aspectRatio: "8.5 / 11",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#1f2937",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "40px 40px",
          }}
        >
          {/* Header — CENTERED for classic look */}
          <div
            style={{
              textAlign: "center",
              borderBottom: `1px solid ${accent}`,
              paddingBottom: "16px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                color: accent,
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "4px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              {personal.fullName || "Your Name"}
            </h1>
            <p
              style={{
                color: "#4b5563",
                fontSize: "12px",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              {personal.jobTitle || "Your Job Title"}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "4px 14px",
                fontSize: "9.5px",
                color: "#4b5563",
              }}
            >
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.location && <span>• {personal.location}</span>}
              {personal.website && <span>• {personal.website}</span>}
              {personal.linkedin && <span>• {personal.linkedin}</span>}
              {personal.github && <span>• {personal.github}</span>}
            </div>
          </div>

          {!hasAnyData && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70%",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <svg
                  style={{ width: "32px", height: "32px", color: "#6b7280" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>
                Preview will appear here
              </p>
              <p style={{ fontSize: "10px", color: "#9ca3af", maxWidth: "180px" }}>
                Start filling the form and see your resume build itself
              </p>
            </div>
          )}

          {/* Summary */}
          {personal.summary && (
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: `1px solid ${accent}`,
                  textAlign: "center",
                }}
              >
                Professional Summary
              </h2>
              <p
                style={{
                  color: "#374151",
                  fontSize: "10px",
                  lineHeight: 1.7,
                  textAlign: "justify",
                  fontStyle: "italic",
                }}
              >
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "10px",
                  paddingBottom: "4px",
                  borderBottom: `1px solid ${accent}`,
                  textAlign: "center",
                }}
              >
                Professional Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {experience.map((exp) => (
                  <div key={exp._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "8px",
                        marginBottom: "3px",
                      }}
                    >
                      <h3 style={{ color: "#111827", fontSize: "11px", fontWeight: 700 }}>
                        {exp.position || "Position"}
                      </h3>
                      <span style={{ color: "#6b7280", fontSize: "9px", flexShrink: 0 }}>
                        {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "10px",
                        fontStyle: "italic",
                        marginBottom: "4px",
                      }}
                    >
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </p>
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul
                        style={{
                          color: "#374151",
                          fontSize: "9.5px",
                          marginTop: "4px",
                          paddingLeft: "20px",
                          listStyle: "disc",
                          lineHeight: 1.6,
                        }}
                      >
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ marginBottom: "3px" }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "10px",
                  paddingBottom: "4px",
                  borderBottom: `1px solid ${accent}`,
                  textAlign: "center",
                }}
              >
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {education.map((edu) => (
                  <div key={edu._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "8px",
                      }}
                    >
                      <h3 style={{ color: "#111827", fontSize: "10.5px", fontWeight: 700 }}>
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h3>
                      <span style={{ color: "#6b7280", fontSize: "9px", flexShrink: 0 }}>
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p style={{ color: "#4b5563", fontSize: "10px", fontStyle: "italic" }}>
                      {edu.institution}
                      {edu.grade && ` · ${edu.grade}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "10px",
                  paddingBottom: "4px",
                  borderBottom: `1px solid ${accent}`,
                  textAlign: "center",
                }}
              >
                Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {skills.map((skill) => (
                  <div key={skill._id}>
                    {skill.category && (
                      <p
                        style={{
                          color: "#111827",
                          fontSize: "10px",
                          fontWeight: 700,
                          marginBottom: "2px",
                        }}
                      >
                        {skill.category}:
                      </p>
                    )}
                    <p style={{ color: "#374151", fontSize: "9.5px", lineHeight: 1.6 }}>
                      {skill.items.filter(Boolean).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "10px",
                  paddingBottom: "4px",
                  borderBottom: `1px solid ${accent}`,
                  textAlign: "center",
                }}
              >
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {projects.map((p) => (
                  <div key={p._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "8px",
                      }}
                    >
                      <h3 style={{ color: "#111827", fontSize: "10.5px", fontWeight: 700 }}>
                        {p.name || "Project Name"}
                      </h3>
                      {p.link && (
                        <span style={{ color: "#6b7280", fontSize: "9px", flexShrink: 0 }}>
                          {p.link}
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p style={{ color: "#374151", fontSize: "9.5px", marginTop: "3px", lineHeight: 1.6 }}>
                        {p.description}
                      </p>
                    )}
                    {p.techStack.filter(Boolean).length > 0 && (
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "9px",
                          fontStyle: "italic",
                          marginTop: "2px",
                        }}
                      >
                        Technologies: {p.techStack.filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ClassicTemplate.displayName = "ClassicTemplate";

export default ClassicTemplate;