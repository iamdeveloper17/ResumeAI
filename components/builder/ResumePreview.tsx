"use client";

import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const { personal, experience, education, skills, projects } = data;
    const accent = data.accentColor || "#2563eb";

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
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#1e293b",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "32px",
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: `2px solid ${accent}`,
              paddingBottom: "16px",
              marginBottom: "16px",
            }}
          >
            <h1
              style={{
                color: accent,
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "4px",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {personal.fullName || "Your Name"}
            </h1>
            <p
              style={{
                color: "#475569",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "8px",
              }}
            >
              {personal.jobTitle || "Your Job Title"}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 16px",
                fontSize: "9px",
                color: "#64748b",
              }}
            >
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>☎ {personal.phone}</span>}
              {personal.location && <span>📍 {personal.location}</span>}
              {personal.website && <span>🌐 {personal.website}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
              {personal.github && <span>gh {personal.github}</span>}
            </div>
          </div>

          {/* Empty State */}
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
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <svg
                  style={{ width: "32px", height: "32px", color: "#3b82f6" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#334155",
                  marginBottom: "4px",
                }}
              >
                Preview will appear here
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "#94a3b8",
                  maxWidth: "180px",
                }}
              >
                Start filling the form and see your resume build itself
              </p>
            </div>
          )}

          {/* Summary */}
          {personal.summary && (
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Summary
              </h2>
              <p
                style={{
                  color: "#334155",
                  fontSize: "9.5px",
                  lineHeight: 1.6,
                }}
              >
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {experience.map((exp) => (
                  <div key={exp._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "8px",
                        marginBottom: "2px",
                      }}
                    >
                      <h3
                        style={{
                          color: "#0f172a",
                          fontSize: "10.5px",
                          fontWeight: 600,
                        }}
                      >
                        {exp.position || "Position"}
                      </h3>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "8.5px",
                          flexShrink: 0,
                        }}
                      >
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#475569",
                        fontSize: "9.5px",
                        fontStyle: "italic",
                      }}
                    >
                      {exp.company}
                      {exp.location && ` · ${exp.location}`}
                    </p>
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul
                        style={{
                          color: "#334155",
                          fontSize: "9px",
                          marginTop: "4px",
                          paddingLeft: "16px",
                          listStyle: "disc",
                        }}
                      >
                        {exp.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} style={{ marginBottom: "2px" }}>
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
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                      <h3
                        style={{
                          color: "#0f172a",
                          fontSize: "10.5px",
                          fontWeight: 600,
                        }}
                      >
                        {edu.degree || "Degree"}{" "}
                        {edu.field && `in ${edu.field}`}
                      </h3>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "8.5px",
                          flexShrink: 0,
                        }}
                      >
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#475569",
                        fontSize: "9.5px",
                        fontStyle: "italic",
                      }}
                    >
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
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid #e2e8f0",
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
                          color: "#0f172a",
                          fontSize: "9.5px",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      >
                        {skill.category}
                      </p>
                    )}
                    <p style={{ color: "#334155", fontSize: "9px" }}>
                      {skill.items.filter(Boolean).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  color: accent,
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                      <h3
                        style={{
                          color: "#0f172a",
                          fontSize: "10.5px",
                          fontWeight: 600,
                        }}
                      >
                        {p.name || "Project Name"}
                      </h3>
                      {p.link && (
                        <span
                          style={{
                            color: "#64748b",
                            fontSize: "8.5px",
                            flexShrink: 0,
                          }}
                        >
                          {p.link}
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p
                        style={{
                          color: "#334155",
                          fontSize: "9px",
                          marginTop: "2px",
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                    {p.techStack.filter(Boolean).length > 0 && (
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "8.5px",
                          fontStyle: "italic",
                          marginTop: "2px",
                        }}
                      >
                        Tech: {p.techStack.filter(Boolean).join(", ")}
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

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;