"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

// Safe alpha helper: works with #rgb, #rrggbb (falls back to the color itself otherwise)
const withAlpha = (color: string, alpha: number) => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const MinDesign5 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#666";

  // 🎨 Design tokens
  const ink = "#0b0b0c";
  const body = "#3f3f46";
  const muted = "#8b8b94";
  const hairline = "#ececee";
  const tint = withAlpha(accent, 0.09);
  const tintBorder = withAlpha(accent, 0.28);

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

  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
    personal.github,
  ].filter(Boolean);

  // Every section: label column on the left, content on the right
  const Section = ({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "128px minmax(0, 1fr)",
        columnGap: "28px",
        padding: "26px 0",
        borderTop: `1px solid ${hairline}`,
        borderBottom: last ? `1px solid ${hairline}` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", paddingTop: "1px", whiteSpace: "normal" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "2px", backgroundColor: accent, marginTop: "4px", flexShrink: 0, ...printColors }} />
        <h2 style={{ fontSize: "12px", fontWeight: 800, color: ink, letterSpacing: "-0.1px", margin: 0 }}>{title}</h2>
      </div>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );

  const hasProjects = !!(projects && projects.length > 0);
  const hasCerts = !!(certifications && certifications.length > 0);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        padding: "60px 56px 52px 56px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: data.fontFamily || "sans-serif",
        fontSize: data.fontSize || "11px",
        color: ink,
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* Top accent edge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", backgroundColor: accent, ...printColors }} />

      {/* HEADER */}
      <div style={{ marginBottom: "34px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-1.4px", lineHeight: 1.04, color: ink, margin: 0 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: "15px", fontWeight: 500, color: accent, marginTop: "10px", letterSpacing: "0.2px" }}>
          {personal.jobTitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "20px", whiteSpace: "normal" }}>
          {contacts.map((c, i) => (
            <span
              key={i}
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: body,
                border: `1px solid ${hairline}`,
                backgroundColor: "#fafafa",
                padding: "4px 11px",
                borderRadius: "999px",
                lineHeight: "1.5",
                ...printColors,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <div style={{ marginBottom: "30px", padding: "18px 22px", backgroundColor: tint, borderLeft: `3px solid ${accent}`, borderRadius: "0 10px 10px 0", ...noBreak, ...printColors }}>
          <p style={{ lineHeight: "1.85", color: ink, fontSize: "12px", margin: 0 }}>{personal.summary}</p>
        </div>
      )}

      <div>
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp._id} style={{ marginBottom: "22px", ...noBreak }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: ink, margin: 0 }}>{exp.position}</h3>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
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
              <p style={{ fontSize: "11.5px", fontWeight: 600, color: accent, margin: "3px 0 9px 0" }}>{exp.company}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "10.5px", color: body, lineHeight: "1.75" }}>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: accent, marginTop: "8px", flexShrink: 0, ...printColors }} />
                    <span style={{ minWidth: 0 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Education" last={!(skills.length > 0) && !hasProjects && !hasCerts}>
          {education.map(edu => (
            <div key={edu._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "14px", ...noBreak }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: ink, margin: 0 }}>{edu.degree}</h3>
                <p style={{ fontSize: "11px", color: accent, fontWeight: 500, margin: "2px 0 0 0" }}>{edu.institution}</p>
              </div>
              <span style={{ fontSize: "9.5px", fontWeight: 600, color: muted, whiteSpace: "nowrap", paddingTop: "2px" }}>
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          ))}
        </Section>

        {skills.length > 0 && (
          <Section title="Skills" last={!hasProjects && !hasCerts}>
            {skills.map(s => (
              <div key={s._id} style={{ display: "grid", gridTemplateColumns: "96px minmax(0, 1fr)", columnGap: "12px", marginBottom: "11px", alignItems: "start", ...noBreak }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: ink, paddingTop: "3px" }}>{s.category}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {s.items.map((i, idx) => (
                    <span
                      key={`${i.name}-${idx}`}
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 600,
                        color: body,
                        backgroundColor: "#f4f4f5",
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
          </Section>
        )}

        {hasProjects && (
          <Section title="Projects" last={!hasCerts}>
            {projects!.map(proj => (
              <div
                key={proj._id}
                style={{ marginBottom: "13px", paddingLeft: "13px", borderLeft: `2px solid ${accent}`, ...noBreak, ...printColors }}
              >
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{proj.name}</div>
                {proj.description && (
                  <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.7", marginTop: "2px" }}>{proj.description}</div>
                )}
              </div>
            ))}
          </Section>
        )}

        {hasCerts && (
          <Section title="Certifications" last>
            {certifications!.map(cert => (
              <div key={cert._id} style={{ marginBottom: "10px", ...noBreak }}>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: ink }}>{cert.name}</div>
                <div style={{ fontSize: "10px", color: muted, marginTop: "1px" }}>{cert.issuer}</div>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
});
MinDesign5.displayName = "MinDesign5";
export default MinDesign5;