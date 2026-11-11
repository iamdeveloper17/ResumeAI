"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ClassicDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#1f2937";

  // 🎨 Design tokens
  const ink = "#171717";
  const body = "#404040";
  const muted = "#737373";
  const paper = "#f8f6f2"; // warm paper tint for the sidebar
  const hairline = "#d6d3cd";

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

  // Heading: small diamond + small-caps title
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "14px", whiteSpace: "normal" }}>
      <span
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: accent,
          transform: "rotate(45deg)",
          flexShrink: 0,
          ...printColors,
        }}
      />
      <h2
        style={{
          fontSize: "13.5px",
          fontWeight: 700,
          fontVariant: "small-caps",
          letterSpacing: "1.4px",
          color: accent,
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );

  const Diamond = ({ top = 8 }: { top?: number }) => (
    <span
      style={{
        width: "4px",
        height: "4px",
        backgroundColor: accent,
        transform: "rotate(45deg)",
        marginTop: `${top}px`,
        flexShrink: 0,
        ...printColors,
      }}
    />
  );

  return (
    <div
      ref={ref}
      style={{
        padding: "56px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "'Times New Roman', Times, serif", // 🚀 Dynamic Font
        fontSize: data.fontSize || "11px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `3px double ${accent}`,
          paddingBottom: "22px",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
          ...printColors,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: 700,
              fontVariant: "small-caps",
              color: accent,
              letterSpacing: "1.5px",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "13px", fontStyle: "italic", color: body, marginTop: "8px", letterSpacing: "0.6px" }}>
            {personal.jobTitle}
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: "10.5px", lineHeight: "1.75", color: body }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "34px", alignItems: "start" }}>
        {/* LEFT COLUMN */}
        <div style={{ backgroundColor: paper, border: `1px solid ${hairline}`, padding: "22px 20px", borderRadius: "3px", ...printColors }}>
          {personal.summary && (
            <div style={{ marginBottom: "28px" }}>
              <SectionTitle>Summary</SectionTitle>
              <p style={{ fontSize: "10.5px", lineHeight: "1.75", textAlign: "justify", color: body, margin: 0 }}>{personal.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <SectionTitle>Skills</SectionTitle>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.75", color: body }}>
                {skills.flatMap(s => s.items).map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                    <Diamond top={8} />
                    <span style={{ minWidth: 0 }}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map(cert => (
                <div key={cert._id} style={{ marginBottom: "10px", fontSize: "11px", ...noBreak }}>
                  <div style={{ fontWeight: 700, color: ink, lineHeight: 1.35 }}>{cert.name}</div>
                  <div style={{ color: muted, fontStyle: "italic", marginTop: "1px" }}>
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ minWidth: 0 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle>Experience</SectionTitle>
              {experience.map(exp => (
                <div key={exp._id} style={{ marginBottom: "19px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>{exp.position}</span>
                    <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", color: accent, fontWeight: 600, margin: "1px 0 7px 0" }}>{exp.company}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.6", color: body }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                        <Diamond />
                        <span style={{ minWidth: 0 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle>Education</SectionTitle>
              {education.map(edu => (
                <div key={edu._id} style={{ marginBottom: "12px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12.5px", color: ink }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </span>
                    <span style={{ fontSize: "10px", fontStyle: "italic", color: muted, whiteSpace: "nowrap" }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "11px", color: body, marginTop: "1px" }}>
                    {edu.institution} {edu.grade && `• ${edu.grade}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {projects.map(proj => (
                <div key={proj._id} style={{ marginBottom: "13px", ...noBreak }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "12px", color: ink }}>{proj.name}</span>
                    {proj.link && <span style={{ fontSize: "10px", fontStyle: "italic", color: accent }}>{proj.link}</span>}
                  </div>
                  {proj.description && <div style={{ fontSize: "11px", lineHeight: "1.6", color: body, marginTop: "2px" }}>{proj.description}</div>}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div style={{ fontSize: "10px", fontStyle: "italic", color: muted, marginTop: "3px" }}>Tech: {proj.techStack.join(", ")}</div>
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
ClassicDesign4.displayName = "ClassicDesign4";
export default ClassicDesign4;