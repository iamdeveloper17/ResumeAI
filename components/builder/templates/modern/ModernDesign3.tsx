"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ModernDesign3 = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = data;
  const accent = data.accentColor || "#0d9488";

  const ink = "#0B1220";
  const body = "#334155";
  const muted = "#94a3b8";
  const hairline = "#e2e8f0";
  const surface = "#f8fafc";
  const tint = `${accent}0D`;
  const tintStrong = `${accent}18`;

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

  const getContactIcon = (type: string) => {
    if (type.includes("@")) return "✉";
    if (/[0-9]/.test(type) && type.length < 20) return "◍";
    return "◎";
  };

  const contacts = [personal.email, personal.phone, personal.location].filter(Boolean);

  const Section = ({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) => (
    <div style={{ ...noBreak }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
        <div style={{ height: "1px", width: "28px", backgroundColor: accent, ...printColors }} />
        <h2
          style={{
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "1.6px",
            textTransform: "uppercase" as const,
            color: muted,
            margin: 0,
          }}
        >
          {kicker || title}
        </h2>
        <div style={{ height: "1px", flex: 1, backgroundColor: hairline }} />
      </div>
      <div style={{ paddingLeft: "40px" }}>{children}</div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        color: ink,
        fontFamily: data.fontFamily || "'Geist Sans', 'Inter', -apple-system, sans-serif",
        fontSize: data.fontSize || "11px",
        letterSpacing: "-0.01em",
        ...printColors,
        ...textBreakStyle,
      }}
    >
      {/* PREMIUM HEADER */}
      <div style={{ position: "relative", padding: "52px 54px 36px 54px", backgroundColor: "#ffffff", overflow: "hidden" }}>
        {/* subtle top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: accent, ...printColors }} />
        {/* soft background glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle at center, ${accent}14 0%, transparent 70%)`,
            ...printColors,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 850,
              color: ink,
              letterSpacing: "-1.8px",
              lineHeight: 0.95,
              margin: 0,
              maxWidth: "75%",
            }}
          >
            {personal.fullName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: accent, ...printColors }} />
            <p style={{ fontSize: "13.5px", fontWeight: 600, color: body, letterSpacing: "-0.2px", margin: 0 }}>
              {personal.jobTitle}
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
            {contacts.map((c, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: body,
                  backgroundColor: surface,
                  border: `1px solid ${hairline}`,
                  padding: "6px 12px",
                  borderRadius: "999px",
                  lineHeight: 1,
                  ...printColors,
                }}
              >
                <span style={{ fontSize: "10px", opacity: 0.7 }}>{getContactIcon(c || "")}</span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 54px 56px 54px", display: "flex", flexDirection: "column", gap: "32px" }}>
        {personal.summary && (
          <Section title="Profile" kicker="About">
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: body, margin: 0, fontWeight: 450, maxWidth: "90%" }}>
              {personal.summary}
            </p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience" kicker="Experience">
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {experience.map((exp) => (
                <div key={exp._id} style={{ position: "relative", ...noBreak }}>
                  {/* timeline */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-27px",
                      top: "6px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      border: `2px solid ${accent}`,
                      ...printColors,
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: 750, color: ink, letterSpacing: "-0.2px", lineHeight: 1.2 }}>
                        {exp.position}
                      </div>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: accent, marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                        {exp.company}
                        <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: muted, display: "inline-block", ...printColors }} />
                        <span style={{ color: muted, fontWeight: 500 }}>
                          {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", fontSize: "11px", color: body, lineHeight: "1.6" }}>
                        <span style={{ color: accent, marginTop: "0px", fontWeight: 700, ...printColors }}>—</span>
                        <span style={{ minWidth: 0, flex: 1 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills" kicker="Expertise">
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {skills.map((s) => (
                <div key={s._id} style={noBreak}>
                  <div style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase" as const, color: muted, marginBottom: "8px" }}>
                    {s.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {s.items.map((it, idx) => (
                      <span
                        key={`${it.name}-${idx}`}
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          color: ink,
                          backgroundColor: "#ffffff",
                          border: `1px solid ${hairline}`,
                          padding: "5px 11px",
                          borderRadius: "8px",
                          lineHeight: 1,
                          boxShadow: `0 0 0 1px ${tintStrong} inset`,
                          ...printColors,
                        }}
                      >
                        {it.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" kicker="Education">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {education.map((edu) => (
                <div key={edu._id} style={{ display: "flex", justifyContent: "space-between", gap: "12px", ...noBreak }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: ink }}>{edu.degree}</div>
                    <div style={{ fontSize: "11px", color: body, marginTop: "2px" }}>{edu.institution}</div>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: muted, whiteSpace: "nowrap", paddingTop: "2px" }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects" kicker="Projects">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {projects.map((proj) => (
                <div key={proj._id} style={{ backgroundColor: surface, border: `1px solid ${hairline}`, borderRadius: "12px", padding: "14px 14px", ...noBreak, ...printColors }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 750, color: ink }}>{proj.name}</div>
                  {proj.description && <div style={{ fontSize: "10.5px", color: body, lineHeight: "1.6", marginTop: "5px" }}>{proj.description}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications && certifications.length > 0 && (
          <Section title="Certifications" kicker="Credentials">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {certifications.map((cert) => (
                <div key={cert._id} style={{ display: "flex", alignItems: "center", gap: "8px", border: `1px dashed ${hairline}`, borderRadius: "999px", padding: "5px 12px", ...noBreak }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: accent, ...printColors }} />
                  <span style={{ fontSize: "10.5px", fontWeight: 650, color: ink }}>{cert.name}</span>
                  <span style={{ fontSize: "10px", color: muted }}>· {cert.issuer}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* footer accent */}
      <div style={{ height: "1px", backgroundColor: hairline, margin: "0 54px" }} />
      <div style={{ padding: "14px 54px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "8.5px", letterSpacing: "1px", textTransform: "uppercase" as const, color: muted, fontWeight: 700 }}>Portfolio · References available</div>
        <div style={{ width: "24px", height: "2px", backgroundColor: accent, ...printColors }} />
      </div>
    </div>
  );
});
ModernDesign3.displayName = "ModernDesign3";
export default ModernDesign3;
