// lib/ats/scorer.ts
import type {
  ResumeData,
  ATSResult,
  ATSIssue,
  ATSCategoryScore,
} from "./types";
import {
  checkContactInfo,
  checkExperience,
  checkEducation,
  checkSkills,
  checkSummary,
  checkProjects,
} from "./rules";

const WEIGHTS = {
  contact: 15,
  experience: 35,
  education: 15,
  skills: 20,
  content: 15,
};

function calculateCategoryScore(
  category: string,
  issues: ATSIssue[],
  maxScore: number
): number {
  if (issues.length === 0) return maxScore;

  let deduction = 0;
  issues.forEach((issue) => {
    if (issue.severity === "critical") deduction += 10;
    else if (issue.severity === "warning") deduction += 5;
    else deduction += 2;
  });

  return Math.max(0, maxScore - deduction);
}

function getGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getTopStrengths(categories: ATSCategoryScore[]): string[] {
  return categories
    .filter((c) => c.score / c.maxScore >= 0.8)
    .sort((a, b) => b.score / b.maxScore - a.score / a.maxScore)
    .slice(0, 3)
    .map((c) => `${c.name}: ${Math.round((c.score / c.maxScore) * 100)}% — solid`)
    .concat(
      categories.some((c) => c.score === c.maxScore)
        ? ["Perfect score in some categories 🎯"]
        : []
    );
}

function getTopSuggestions(allIssues: ATSIssue[]): string[] {
  const priorityOrder = { critical: 0, warning: 1, info: 2 };
  const sorted = [...allIssues].sort(
    (a, b) => priorityOrder[a.severity] - priorityOrder[b.severity]
  );

  return sorted.slice(0, 5).map((issue) => issue.suggestion);
}

export function calculateATSScore(resume: ResumeData): ATSResult {
  const contactIssues = checkContactInfo(resume);
  const experienceIssues = checkExperience(resume);
  const educationIssues = checkEducation(resume);
  const skillsIssues = checkSkills(resume);
  const contentIssues = [...checkSummary(resume), ...checkProjects(resume)];

  const categories: ATSCategoryScore[] = [
    {
      name: "Contact Info",
      maxScore: WEIGHTS.contact,
      score: calculateCategoryScore("contact", contactIssues, WEIGHTS.contact),
      issues: contactIssues,
    },
    {
      name: "Experience",
      maxScore: WEIGHTS.experience,
      score: calculateCategoryScore(
        "experience",
        experienceIssues,
        WEIGHTS.experience
      ),
      issues: experienceIssues,
    },
    {
      name: "Education",
      maxScore: WEIGHTS.education,
      score: calculateCategoryScore(
        "education",
        educationIssues,
        WEIGHTS.education
      ),
      issues: educationIssues,
    },
    {
      name: "Skills",
      maxScore: WEIGHTS.skills,
      score: calculateCategoryScore("skills", skillsIssues, WEIGHTS.skills),
      issues: skillsIssues,
    },
    {
      name: "Content",
      maxScore: WEIGHTS.content,
      score: calculateCategoryScore("content", contentIssues, WEIGHTS.content),
      issues: contentIssues,
    },
  ];

  const overallScore = Math.round(
    categories.reduce((sum, cat) => sum + cat.score, 0)
  );

  const allIssues = categories.flatMap((cat) => cat.issues);

  return {
    overallScore,
    grade: getGrade(overallScore),
    categories,
    allIssues,
    topStrengths: getTopStrengths(categories),
    topSuggestions: getTopSuggestions(allIssues),
    checkedAt: new Date().toISOString(),
  };
}