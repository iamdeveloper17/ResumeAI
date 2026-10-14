// lib/ats/types.ts

export interface ATSIssue {
  id: string;
  severity: "critical" | "warning" | "info";
  category: "contact" | "experience" | "education" | "skills" | "formatting" | "content";
  message: string;
  suggestion: string;
}

export interface ATSCategoryScore {
  name: string;
  score: number;
  maxScore: number;
  issues: ATSIssue[];
}

export interface ATSResult {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  categories: ATSCategoryScore[];
  allIssues: ATSIssue[];
  topStrengths: string[];
  topSuggestions: string[];
  aiInsights?: string;
  checkedAt: string;
}

export interface ResumeData {
  personal?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    summary?: string;
  };
  experience?: Array<{
    company?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    bullets?: string[];
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    grade?: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name?: string;
    description?: string;
    tech?: string[];
    link?: string;
  }>;
}