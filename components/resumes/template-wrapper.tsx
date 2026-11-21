export function TemplateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="resume-preview bg-white text-black shadow-xl">
      {children}
    </div>
  );
}