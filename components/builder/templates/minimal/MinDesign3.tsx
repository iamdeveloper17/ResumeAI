"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#333";

  // 🎨 Design tokens (soft, airy)
  const ink = "#111827";
  const body = "#4b5563";
  const muted = "#9ca3af";
  const hairline = "#e5e7eb";

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

  // Quiet label-style heading with a tiny accent tick
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", whiteSpace: "normal" }}>
      <span style={{ width: "14px", height: "2px", backgroundColor: accent, display: "inline-block", flexShrink: 0, ...printColors }} />
      <h2 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.6px", color: body, margin: 0 }}>{children}</h2>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "40px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: body,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      <div style={{ border: `1px solid ${hairline}`, borderRadius: "6px", padding: "50px", minHeight: "1040px", ...printColors }}>
        {/* HEADER */}
        <div style={{ marginBottom: "38px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: accent, letterSpacing: "-1px", lineHeight: 1.05, margin: 0 }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "14px", color: muted, fontWeight: 500, marginTop: "8px", letterSpacing: "0.3px" }}>{personal.jobTitle}</p>
        </div>

        <div style={{ display: "flex", gap: "36px", alignItems: "flex-start" }}>
          {/* LEFT SIDEBAR */}
          <div style={{ width: "205px", flexShrink: 0, borderRight: `1px solid ${hairline}`, paddingRight: "28px" }}>
            <div style={{ marginBottom: "32px" }}>
              <SectionTitle>Contact</SectionTitle>
              <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.9" }}>
                {personal.email && <div>{personal.email}</div>}
                {personal.phone && <div>{personal.phone}</div>}
                {personal.location && <div>{personal.location}</div>}
              </div>
            </div>

            {skills.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <SectionTitle>Skills</SectionTitle>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {skills.flatMap(s => s.items).map((item, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 500,
                        color: body,
                        border: `1px solid ${hairline}`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <SectionTitle>Education</SectionTitle>
                {education.map(edu => (
                  <div key={edu._id} style={{ marginBottom: "13px", fontSize: "10.5px", ...noBreak }}>
                    <div style={{ fontWeight: 700, color: ink, lineHeight: 1.4 }}>{edu.degree}</div>
                    <div style={{ color: muted, marginTop: "2px" }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div>
                <SectionTitle>Certifications</SectionTitle>
                {certifications.map(cert => (
                  <div key={cert._id} style={{ marginBottom: "11px", fontSize: "10.5px", ...noBreak }}>
                    <div style={{ fontWeight: 700, color: ink, lineHeight: 1.4 }}>{cert.name}</div>
                    <div style={{ color: muted, marginTop: "1px" }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {personal.summary && (
              <div style={{ marginBottom: "32px", ...noBreak }}>
                <SectionTitle>Profile</SectionTitle>
                <p style={{ fontSize: "12px", lineHeight: "1.8", color: body, margin: 0 }}>{personal.summary}</p>
              </div>
            )}

            {experience.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <SectionTitle>Experience</SectionTitle>
                {experience.map(exp => (
                  <div key={exp._id} style={{ marginBottom: "22px", ...noBreak }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px", flexWrap: "wrap", gap: "6px" }}>
                      <h3 style={{ fontSize: "13px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: "9.5px", color: muted, whiteSpace: "nowrap" }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: accent, fontWeight: 600, marginBottom: "8px" }}>{exp.company}</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.7" }}>
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                          <span style={{ color: muted, flexShrink: 0 }}>–</span>
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
                  <div key={proj._id} style={{ marginBottom: "14px", ...noBreak }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: ink }}>{proj.name}</div>
                    {proj.description && (
                      <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.7", marginTop: "2px" }}>{proj.description}</div>
                    )}
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