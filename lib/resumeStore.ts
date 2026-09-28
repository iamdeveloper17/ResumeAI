import { create } from "zustand";

// ─── Types ───
export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  _id: string;
  category: string;
  items: string[];
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface Certification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  title: string;
  template: "modern" | "classic";
  accentColor: string;
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

interface ResumeStore {
  data: ResumeData;
  currentStep: number;
  isSaving: boolean;
  lastSaved: Date | null;

  setData: (data: Partial<ResumeData>) => void;
  setPersonal: (personal: Partial<ResumeData["personal"]>) => void;
  setStep: (step: number) => void;
  setIsSaving: (isSaving: boolean) => void;
  setLastSaved: (date: Date) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addBullet: (expId: string) => void;
  updateBullet: (expId: string, index: number, value: string) => void;
  removeBullet: (expId: string, index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setSkills: (skills: Skill[]) => void; // ← NEW

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  reset: () => void;
}

const uid = () => Math.random().toString(36).substring(2, 10);

export const emptyResume: ResumeData = {
  title: "My Resume",
  template: "modern",
  accentColor: "#2563eb",
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

// ─── Step Validation ───
export interface ValidationError {
  field: string;
  message: string;
}

export function validateStep(
  step: number,
  data: ResumeData
): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (step) {
    case 0: // Personal
      if (!data.personal.fullName.trim())
        errors.push({ field: "fullName", message: "Full name is required" });
      if (!data.personal.jobTitle.trim())
        errors.push({ field: "jobTitle", message: "Job title is required" });
      if (!data.personal.email.trim())
        errors.push({ field: "email", message: "Email is required" });
      else if (!/^\S+@\S+\.\S+$/.test(data.personal.email))
        errors.push({ field: "email", message: "Invalid email format" });
      break;

    case 1: // Experience
      data.experience.forEach((exp, i) => {
        if (!exp.company.trim())
          errors.push({
            field: `exp-${i}-company`,
            message: `Experience ${i + 1}: Company required`,
          });
        if (!exp.position.trim())
          errors.push({
            field: `exp-${i}-position`,
            message: `Experience ${i + 1}: Position required`,
          });
      });
      break;

    case 2: // Education
      data.education.forEach((edu, i) => {
        if (!edu.institution.trim())
          errors.push({
            field: `edu-${i}-institution`,
            message: `Education ${i + 1}: Institution required`,
          });
        if (!edu.degree.trim())
          errors.push({
            field: `edu-${i}-degree`,
            message: `Education ${i + 1}: Degree required`,
          });
      });
      break;

    case 3: // Skills
      data.skills.forEach((skill, i) => {
        if (!skill.category.trim())
          errors.push({
            field: `skill-${i}-category`,
            message: `Skill ${i + 1}: Category required`,
          });
      });
      break;

    case 4: // Projects
      // Optional
      break;

    default:
      break;
  }

  return errors;
}

// ─── Store ───
export const useResumeStore = create<ResumeStore>((set) => ({
  data: emptyResume,
  currentStep: 0,
  isSaving: false,
  lastSaved: null,

  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),

  setPersonal: (personal) =>
    set((state) => ({
      data: {
        ...state.data,
        personal: { ...state.data.personal, ...personal },
      },
    })),

  setStep: (step) => set({ currentStep: step }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),

  // ─── Experience ───
  addExperience: () =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [
          ...state.data.experience,
          {
            _id: uid(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            bullets: [""],
          },
        ],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e._id === id ? { ...e, ...data } : e
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((e) => e._id !== id),
      },
    })),

  addBullet: (expId) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e._id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
        ),
      },
    })),

  updateBullet: (expId, index, value) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e._id === expId
            ? {
                ...e,
                bullets: e.bullets.map((b, i) => (i === index ? value : b)),
              }
            : e
        ),
      },
    })),

  removeBullet: (expId, index) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((e) =>
          e._id === expId
            ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) }
            : e
        ),
      },
    })),

  // ─── Education ───
  addEducation: () =>
    set((state) => ({
      data: {
        ...state.data,
        education: [
          ...state.data.education,
          {
            _id: uid(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            grade: "",
          },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((e) =>
          e._id === id ? { ...e, ...data } : e
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((e) => e._id !== id),
      },
    })),

  // ─── Skills ───
  addSkill: () =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [
          ...state.data.skills,
          { _id: uid(), category: "", items: [""] },
        ],
      },
    })),

  updateSkill: (id, data) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((s) =>
          s._id === id ? { ...s, ...data } : s
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((s) => s._id !== id),
      },
    })),

  // ✅ NEW: setSkills — for AI skill suggestion
  setSkills: (skills) =>
    set((state) => ({
      data: { ...state.data, skills },
    })),

  // ─── Projects ───
  addProject: () =>
    set((state) => ({
      data: {
        ...state.data,
        projects: [
          ...state.data.projects,
          {
            _id: uid(),
            name: "",
            description: "",
            techStack: [""],
            link: "",
          },
        ],
      },
    })),

  updateProject: (id, data) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((p) =>
          p._id === id ? { ...p, ...data } : p
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((p) => p._id !== id),
      },
    })),

  // ─── Certifications ───
  addCertification: () =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: [
          ...state.data.certifications,
          { _id: uid(), name: "", issuer: "", date: "", link: "" },
        ],
      },
    })),

  updateCertification: (id, data) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.map((c) =>
          c._id === id ? { ...c, ...data } : c
        ),
      },
    })),

  removeCertification: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        certifications: state.data.certifications.filter(
          (c) => c._id !== id
        ),
      },
    })),

  reset: () =>
    set({
      data: emptyResume,
      currentStep: 0,
      isSaving: false,
      lastSaved: null,
    }),
}));