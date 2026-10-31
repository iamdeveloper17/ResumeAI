"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import HexagonTemplate from "./HexagonTemplate";
import DynamicTemplate from "./DynamicTemplate";
import VibrantTemplate from "./VibrantTemplate";
import ExecutiveEliteTemplate from "./ExecutiveEliteTemplate";
import ModernCorporateTemplate from "./ModernCorporateTemplate";

const CreativeTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#8b5cf6";
  const variant = data.styleVariant || 1;

  if (variant === 5) {
    return <HexagonTemplate ref={ref} data={data} />;
  }

  if (variant === 4) {
    return <DynamicTemplate ref={ref} data={data} />;
  }

  if (variant === 3) {
    return <VibrantTemplate ref={ref} data={data} />;
  }

  if (variant === 2) {
    return <ExecutiveEliteTemplate ref={ref} data={data} />;
  }

  if (variant === 1) {
    return <ModernCorporateTemplate ref={ref} data={data} />;
  }

  const variants = {
    1: { sidebarBg: accent, textColor: "#fff", layout: "row", mainBg: "#fff" },
  };

  const currentVariant = variants[variant as keyof typeof variants] || variants[1];

  // 🚀 Common Header Render (For Top layout)
  const Header = () => (
    <div style={{ textAlign: "center", padding: "32px", borderBottom: `2px solid ${accent}`, marginBottom: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: accent }}>{personal.fullName}</h1>
      <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>{personal.jobTitle}</p>
      <div style={{ fontSize: "11px", color: "#888", marginTop: "8px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>• {personal.phone}</span>}
        {personal.location && <span>• {personal.location}</span>}
      </div>
    </div>
  );

  // 🚀 Sidebar Render
  const Sidebar = () => (
    <div style={{ width: "35%", backgroundColor: currentVariant.sidebarBg, color: currentVariant.textColor, padding: "32px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", lineHeight: "1.2", marginBottom: "8px" }}>{personal.fullName}</h1>
      <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "32px" }}>{personal.jobTitle}</p>
      
      <div style={{ fontSize: "11px", lineHeight: "1.8", marginBottom: "32px" }}>
        {personal.email && <div>✉ {personal.email}</div>}
        {personal.phone && <div>📞 {personal.phone}</div>}
        {personal.location && <div>📍 {personal.location}</div>}
      </div>

      {skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${currentVariant.textColor === "#fff" ? "rgba(255,255,255,0.3)" : "#ddd"}`, paddingBottom: "8px", marginBottom: "12px" }}>Skills</h2>
          {skills.map((s) => (
             <div key={s._id} style={{ marginBottom: "8px" }}>
               <div style={{ fontSize: "11px", fontWeight: "bold" }}>{s.category}</div>
               <div style={{ fontSize: "10px", opacity: 0.8 }}>{s.items.join(", ")}</div>
             </div>
          ))}
        </div>
      )}
    </div>
  );

  // 🚀 Main Content Render
  const MainContent = () => (
    <div style={{ width: currentVariant.layout === "col" ? "100%" : "65%", padding: "40px" }}>
      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "8px" }}>About Me</h2>
          <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "12px" }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</div>
              <div style={{ fontSize: "11px", color: accent, fontWeight: "bold" }}>{exp.company}</div>
              <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
              <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#555" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div ref={ref} style={{ 
      backgroundColor: currentVariant.mainBg, 
      display: "flex", 
      flexDirection: currentVariant.layout === "col" ? "column" : currentVariant.layout as any, 
      minHeight: "1123px", 
      fontFamily: data.fontFamily || "sans-serif", 
      fontSize: data.fontSize || "11px",
      border: currentVariant.border || "none"
    }}>
      {variant === 3 ? (
        <>
          <Header />
          <div style={{ display: "flex", padding: "0 32px 32px 32px" }}>
             <div style={{ width: "35%", paddingRight: "20px" }}>
                {skills.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, textTransform: "uppercase", borderBottom: `1px solid #ddd`, paddingBottom: "8px", marginBottom: "12px" }}>Skills</h2>
                    {skills.map((s) => (
                      <div key={s._id} style={{ marginBottom: "8px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "bold" }}>{s.category}</div>
                        <div style={{ fontSize: "10px", color: "#666" }}>{s.items.join(", ")}</div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
             <div style={{ width: "65%" }}>
                {personal.summary && (
                  <div style={{ marginBottom: "24px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "8px" }}>About Me</h2>
                    <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#444" }}>{personal.summary}</p>
                  </div>
                )}
                {experience.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: "16px", fontWeight: "bold", color: accent, marginBottom: "12px" }}>Experience</h2>
                    {experience.map((exp) => (
                      <div key={exp._id} style={{ marginBottom: "16px" }}>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>{exp.position}</div>
                        <div style={{ fontSize: "11px", color: accent, fontWeight: "bold" }}>{exp.company}</div>
                        <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                        <ul style={{ fontSize: "11px", paddingLeft: "16px", color: "#555" }}>
                          {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>
        </>
      ) : (
        <>
          {currentVariant.layout === "row-reverse" ? (
            <>
              <MainContent />
              <Sidebar />
            </>
          ) : (
            <>
              <Sidebar />
              <MainContent />
            </>
          )}
        </>
      )}
    </div>
  );
});
CreativeTemplate.displayName = "CreativeTemplate";
export default CreativeTemplate;