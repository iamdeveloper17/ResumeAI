"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const CreativeDesign1 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#374151";

  // 🎨 Design tokens
  const ink = "#0f172a";
  const body = "#475569";
  const muted = "#64748b";
  const hairline = "#e2e8f0";
  const sidebarBg = "#f1f5f9";

  const textBreakStyle = {
    wordBreak: "break-word" as const,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  };

  const printColors = {
    WebkitPrintColorAdjust: "exact" as const,
    printColorAdjust: "exact" as const,
  };

  const noBreak = { breakInside: "avoid" as const, pageBreakInside: "avoid" as const };

  // Initials shown when there is no photo
  const initials = (personal.fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  // Section heading with a short accent underline
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: "14px", whiteSpace: "normal" }}>
      <h2 style={{ fontSize: "14px", fontWeight: 800, color: ink, letterSpacing: "-0.1px", margin: 0 }}>{children}</h2>
      <div style={{ width: "28px", height: "3px", borderRadius: "2px", backgroundColor: accent, marginTop: "6px", ...printColors }} />
    </div>
  );

  const contactLabel = {
    fontSize: "8.5px",
    fontWeight: 700,
    color: muted,
    letterSpacing: "0.3px",
    marginBottom: "1px",
  };

  const contactValue = { fontSize: "10.5px", color: ink, lineHeight: "1.45", marginBottom: "9px" };

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: "#334155",
        display: "flex",
        flexDirection: "column",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* TOP SPLIT HEADER */}
      <div style={{ display: "flex", height: "190px" }}>
        <div
          style={{
            width: "35%",
            backgroundColor: sidebarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...printColors,
          }}
        >
          <div
            style={{
              width: "132px",
              height: "132px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: `5px solid ${accent}`,
              outline: "6px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              ...printColors,
            }}
          >
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt={personal.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : initials ? (
              <span style={{ fontSize: "40px", fontWeight: 800, color: accent, letterSpacing: "1px" }}>{initials}</span>
            ) : (
              <span style={{ fontSize: "56px", color: "#94a3b8" }}>👤</span>
            )}
          </div>
        </div>

        <div
          style={{
            width: "65%",
            backgroundColor: accent,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 40px",
            ...printColors,
          }}
        >
          <h1 style={{ fontSize: "34px", fontWeight: 900, lineHeight: "1.1", letterSpacing: "-0.5px", margin: 0 }}>
            {personal.fullName}
          </h1>
          <div style={{ width: "36px", height: "3px", backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "2px", margin: "12px 0 10px 0", ...printColors }} />
          <p style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.88)", margin: 0, letterSpacing: "0.4px" }}>
            {personal.jobTitle}
          </p>
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width: "35%",
            backgroundColor: sidebarBg,
            padding: "26px 28px 32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            ...printColors,
          }}
        >
          <div>
            <SectionTitle>Contact</SectionTitle>
            {personal.phone && (
              <div>
                <div style={contactLabel}>Phone</div>
                <div style={contactValue}>{personal.phone}</div>
              </div>
            )}
            {personal.email && (
              <div>
                <div style={contactLabel}>Email</div>
                <div style={contactValue}>{personal.email}</div>
              </div>
            )}
            {personal.location && (
              <div>
                <div style={contactLabel}>Location</div>
                <div style={contactValue}>{personal.location}</div>
              </div>
            )}
            {personal.linkedin && (
              <div>
                <div style={contactLabel}>LinkedIn</div>
                <div style={contactValue}>{personal.linkedin}</div>
              </div>
            )}
            {personal.website && (
              <div>
                <div style={contactLabel}>Website</div>
                <div style={contactValue}>{personal.website}</div>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div>
              <SectionTitle>Skills</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 600,
                      color: ink,
                      backgroundColor: "#ffffff",
                      border: `1px solid ${hairline}`,
                      borderLeft: `3px solid ${accent}`,
                      padding: "3px 9px",
                      borderRadius: "6px",
                      lineHeight: "1.5",
                      ...printColors,
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                  <div style={{ fontSize: "10.5px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  <div style={{ fontSize: "9.5px", fontWeight: 600, color: accent, marginTop: "2px" }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "11px", ...noBreak }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ width: "65%", padding: "26px 40px 32px 40px", backgroundColor: "#ffffff" }}>
          {personal.summary && (
            <div style={{ marginBottom: "26px", ...noBreak }}>
              <SectionTitle>About me</SectionTitle>
              <p style={{ fontSize: "11.5px", lineHeight: "1.75", color: body, margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: "26px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "18px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: ink }}>{exp.position}</div>
                    <span style={{ fontSize: "9px", fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: accent, fontWeight: 700, margin: "2px 0 7px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.65" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "9px", marginBottom: "3px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "1px", backgroundColor: accent, marginTop: "7px", flexShrink: 0, ...printColors }} />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div
                  key={proj._id}
                  style={{ marginBottom: "13px", paddingTop: "10px", borderTop: `1px solid ${hairline}`, ...noBreak }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 700, color: ink }}>{proj.name}</div>
                  <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.6", marginTop: "2px" }}>{proj.description}</div>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "9.5px", color: muted, fontStyle: "italic", marginTop: "4px" }}>
                      Tech: {proj.techStack.join(", ")}
                    </div>
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
CreativeDesign1.displayName = "CreativeDesign1";
export default CreativeDesign1;