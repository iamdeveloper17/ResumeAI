"use client";

import { useResumeStore } from "@/lib/resumeStore";
import { Plus, Trash2, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// 🚀 Suggestions List
const COMMON_SKILLS = [
  "React", "Next.js", "Node.js", "MongoDB", "TypeScript", "JavaScript",
  "HTML", "CSS", "TailwindCSS", "Express.js", "Python", "Java", "C++",
  "AWS", "Docker", "Git", "Figma", "UI/UX Design", "Communication", "Problem Solving"
];

interface SkillsStepProps {
  errors?: Record<string, string>;
}

export default function SkillsStep({ errors = {} }: SkillsStepProps) {
  const { data, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const addSkillItem = (skillId: string) => {
    const inputVal = inputValues[skillId];
    if (!inputVal || !inputVal.trim()) return;

    const skill = data.skills.find(s => s._id === skillId);
    if (!skill) return;

    // 🚀 Check karo ki pehle se same skill toh nahi hai
    if (skill.items.some(item => item.name.toLowerCase() === inputVal.trim().toLowerCase())) {
      setInputValues(prev => ({ ...prev, [skillId]: "" }));
      return;
    }

    const newItem = { name: inputVal.trim(), level: 80 };
    updateSkill(skillId, { items: [...skill.items, newItem] });
    
    // Input clear karo
    setInputValues(prev => ({ ...prev, [skillId]: "" }));
  };

  const removeSkillItem = (skillId: string, index: number) => {
    const skill = data.skills.find(s => s._id === skillId);
    if (!skill) return;
    
    const newItems = skill.items.filter((_, i) => i !== index);
    updateSkill(skillId, { items: newItems });
  };

  const updateSkillLevel = (skillId: string, index: number, level: number) => {
    const skill = data.skills.find(s => s._id === skillId);
    if (!skill) return;

    const newItems = skill.items.map((item, i) => 
      i === index ? { ...item, level } : item
    );
    updateSkill(skillId, { items: newItems });
  };

  return (
    <div className="space-y-4">
      {data.skills.length === 0 && (
        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-4">
            No skill categories yet
          </p>
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Skill Category
          </button>
        </div>
      )}

      {data.skills.map((skill, index) => {
        // 🚀 Suggestions filter karo based on input
        const currentInput = inputValues[skill._id!] || "";
        const filteredSuggestions = currentInput.trim().length > 0 
  ? COMMON_SKILLS.filter(s => 
      s.toLowerCase().includes(currentInput.toLowerCase()) && 
      // 🚀 item.name check karo ki undefined na ho
      !skill.items.some(item => item && item.name && item.name.toLowerCase() === s.toLowerCase())
    ).slice(0, 5)
  : [];

        return (
          <div
            key={skill._id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
          >
            {/* Category Name */}
            <div className="flex items-center gap-3 mb-4">
              <input
                className={`flex-1 px-3 py-2 bg-slate-50 border rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                  errors[`skill-${index}-category`]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                placeholder="Category (e.g., Frontend, Backend)"
                value={skill.category}
                onChange={(e) => updateSkill(skill._id!, { category: e.target.value })}
              />
              <button
                onClick={() => removeSkill(skill._id!)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skills List with Sliders */}
            <div className="space-y-3 mb-4">
              {skill.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-sm font-semibold text-slate-700 w-24 truncate" title={item.name}>
                    {item.name}
                  </span>
                  <Slider
                    value={[item.level]}
                    max={100}
                    min={10}
                    step={5}
                    onValueChange={(val: number[]) => updateSkillLevel(skill._id!, i, val[0])}
                    className="flex-1 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-blue-600 w-10 text-right">
                    {item.level}%
                  </span>
                  <button
                    onClick={() => removeSkillItem(skill._id!, i)}
                    className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill Input with Suggestions */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValues[skill._id!] || ""}
                  onChange={(e) => setInputValues(prev => ({ ...prev, [skill._id!]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkillItem(skill._id!);
                    }
                  }}
                  placeholder="Type a skill (e.g., React) and press Enter..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
                <button
                  onClick={() => addSkillItem(skill._id!)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* 🚀 Suggestions Dropdown 🚀 */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filteredSuggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        const skillData = data.skills.find(s => s._id === skill._id);
                        if (skillData) {
                          updateSkill(skill._id!, { 
                            items: [...skillData.items, { name: sug, level: 80 }] 
                          });
                          setInputValues(prev => ({ ...prev, [skill._id!]: "" }));
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-400" />
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {data.skills.length > 0 && (
        <button
          onClick={addSkill}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another category
        </button>
      )}
    </div>
  );
}