"use client";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resumeStore";

// Safe alpha helper: works with #rgb and #rrggbb (returns the color itself otherwise)
const withAlpha = (color: string, alpha: number) => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const ExecDesign4 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#059669";

  // 🎨 Design tokens
  const ink = "#0b1220";
  const body = "#3f4a5a";
  const muted = "#6b7280";
  const hairline = "#e5e7eb";
  const tint = withAlpha(accent, 0.09);
  const tintBorder = withAlpha(accent, 0.28);
  const numeral = withAlpha(accent, 0.28);

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

  const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);

  // Build the sections first (same conditions as before) so they can be numbered 01, 02, ...
  const sections: { title: string; node: ReactNode }[] = [];

  // 🚀 SUMMARY
  if (personal.summary) {
    sections.push({
      title: "Summary",
      node: (
        <p style={{ fontSize: "12.5px", lineHeight: "1.8", color: ink, margin: 0, ...noBreak }}>{personal.summary}</p>
      ),
    });
  }

  sections.push({
    title: "Experience",
    node: (
      <div>
        {experience.map(exp => (
          <div key={exp._id} style={{ marginBottom: "22px", ...noBreak }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 800, color: ink, margin: 0 }}>
                {exp.position} <span style={{ color: accent, fontWeight: 600 }}>at {exp.company}</span>
              </h3>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: accent,
                  backgroundColor: tint,
                  border: `1px solid ${tintBorder}`,
                  padding: "2px 9px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  ...printColors,
                }}
              >
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "9px 0 0 0", lineHeight: "1.7", color: body, fontSize: "10.5px" }}>
              {exp.bullets.filter(Boolean).map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "1px", backgroundColor: accent, marginTop: "8px", flexShrink: 0, ...printColors }} />
                  <span style={{ minWidth: 0 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  });

  if (education.length > 0) {
    sections.push({
      title: "Education",
      node: (
        <div>
          {education.map(edu => (
            <div key={edu._id} style={{ marginBottom: "13px", ...noBreak }}>
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{edu.degree}</div>
              <div style={{ fontSize: "10.5px", color: muted, marginTop: "2px" }}>
                {edu.institution} | {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (skills.length > 0) {
    sections.push({
      title: "Skills",
      node: (
        <div>
          {skills.map(s => (
            <div
              key={s._id}
              style={{ display: "grid", gridTemplateColumns: "100px minmax(0, 1fr)", columnGap: "12px", marginBottom: "11px", alignItems: "start", ...noBreak }}
            >
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: ink, paddingTop: "3px" }}>{s.category}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {s.items.map((i, idx) => (
                  <span
                    key={`${i.name}-${idx}`}
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 600,
                      color: ink,
                      backgroundColor: "#f3f4f6",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      lineHeight: "1.5",
                      ...printColors,
                    }}
                  >
                    {i.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (projects && projects.length > 0) {
    sections.push({
      title: "Projects",
      node: (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px" }}>
          {projects.map(proj => (
            <div
              key={proj._id}
              style={{
                padding: "12px 14px",
                backgroundColor: tint,
                borderTop: `3px solid ${accent}`,
                borderRadius: "8px",
                ...noBreak,
                ...printColors,
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 800, color: ink }}>{proj.name}</div>
              {proj.description && (
                <div style={{ fontSize: "10px", color: body, lineHeight: "1.6", marginTop: "3px" }}>{proj.description}</div>
              )}
            </div>
          ))}
        </div>
      ),
    });
  }

  if (certifications && certifications.length > 0) {
    sections.push({
      title: "Certifications",
      node: (
        <div>
          {certifications.map(cert => (
            <div key={cert._id} style={{ marginBottom: "10px", ...noBreak }}>
              <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink }}>{cert.name}</div>
              <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      ),
    });
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Full-height accent rail */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "14px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div style={{ padding: "50px 48px 30px 62px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: ink, lineHeight: 1.02, letterSpacing: "-1.6px", margin: 0 }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "15px", fontWeight: 600, color: accent, marginTop: "11px", letterSpacing: "0.3px" }}>
            {personal.jobTitle}
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "10.5px",
            color: body,
            lineHeight: "1.9",
            paddingTop: "10px",
            borderTop: `3px solid ${accent}`,
            minWidth: "150px",
            ...printColors,
          }}
        >
          {contacts.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 48px 46px 62px" }}>
        {sections.map((s, idx) => (
          <div
            key={s.title}
            style={{
              display: "grid",
              gridTemplateColumns: "118px minmax(0, 1fr)",
              columnGap: "26px",
              padding: "24px 0 6px 0",
              borderTop: `1px solid ${hairline}`,
              marginTop: idx === 0 ? "8px" : 0,
            }}
          >
            <div>
              <div style={{ fontSize: "26px", fontWeight: 800, color: numeral, letterSpacing: "-1px", lineHeight: 1 }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h2 style={{ fontSize: "13px", fontWeight: 800, color: ink, margin: "6px 0 0 0", whiteSpace: "normal" }}>{s.title}</h2>
            </div>
            <div style={{ minWidth: 0 }}>{s.node}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
ExecDesign4.displayName = "ExecDesign4";
export default ExecDesign4;