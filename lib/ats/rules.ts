// lib/ats/rules.ts
import type { ResumeData, ATSIssue } from "./types";

const ACTION_VERBS = [
  "led", "built", "designed", "developed", "created", "implemented",
  "improved", "increased", "decreased", "reduced", "launched", "shipped",
  "managed", "mentored", "architected", "optimized", "automated",
  "delivered", "achieved", "spearheaded", "drove", "established",
  "streamlined", "enhanced", "scaled", "migrated", "integrated",
];

const WEAK_WORDS = [
  "responsible for", "worked on", "helped with", "assisted in",
  "involved in", "participated in", "duties included", "tasked with",
];

const QUANTIFIED_PATTERN = /(\d+%|\d+x|\$\d+|₹\d+|\d+\+|\d+[kmb]\b|\d+\s*(users|customers|clients|projects|people|team|members))/i;

export function checkContactInfo(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const p = resume.personal || {};

  if (!p.email) {
    issues.push({
      id: "contact-email-missing",
      severity: "critical",
      category: "contact",
      message: "Email address is missing",
      suggestion: "Add your professional email — ATS systems need this to contact you",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    issues.push({
      id: "contact-email-invalid",
      severity: "warning",
      category: "contact",
      message: "Email format looks invalid",
      suggestion: "Use a standard email like name@gmail.com",
    });
  }

  if (!p.phone) {
    issues.push({
      id: "contact-phone-missing",
      severity: "critical",
      category: "contact",
      message: "Phone number is missing",
      suggestion: "Add your phone number with country code (e.g., +91 98765 43210)",
    });
  }

  if (!p.location) {
    issues.push({
      id: "contact-location-missing",
      severity: "warning",
      category: "contact",
      message: "Location is missing",
      suggestion: "Add city, state — helps with location-based filtering",
    });
  }

  if (!p.linkedin) {
    issues.push({
      id: "contact-linkedin-missing",
      severity: "info",
      category: "contact",
      message: "LinkedIn profile is missing",
      suggestion: "Add LinkedIn URL — 87% of recruiters check it",
    });
  }

  return issues;
}

export function checkExperience(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const experiences = resume.experience || [];

  if (experiences.length === 0) {
    issues.push({
      id: "experience-empty",
      severity: "critical",
      category: "experience",
      message: "No work experience listed",
      suggestion: "Add at least one experience — internships and freelance count too",
    });
    return issues;
  }

  experiences.forEach((exp, idx) => {
    if (!exp.company) {
      issues.push({
        id: `experience-${idx}-company`,
        severity: "warning",
        category: "experience",
        message: `Experience ${idx + 1}: Company name missing`,
        suggestion: "Add company name for each experience",
      });
    }

    if (!exp.role) {
      issues.push({
        id: `experience-${idx}-role`,
        severity: "warning",
        category: "experience",
        message: `Experience ${idx + 1}: Job title missing`,
        suggestion: "Add your job title/role",
      });
    }

    if (!exp.startDate) {
      issues.push({
        id: `experience-${idx}-startdate`,
        severity: "warning",
        category: "experience",
        message: `Experience ${idx + 1}: Start date missing`,
        suggestion: "Add start date (MM/YYYY format works best for ATS)",
      });
    }

    const bullets = (exp.bullets || []).filter((b) => b && b.trim());
    if (bullets.length === 0) {
      issues.push({
        id: `experience-${idx}-bullets-empty`,
        severity: "critical",
        category: "experience",
        message: `Experience ${idx + 1}: No bullet points`,
        suggestion: "Add 3-5 bullet points describing your achievements",
      });
    } else if (bullets.length < 3) {
      issues.push({
        id: `experience-${idx}-bullets-few`,
        severity: "info",
        category: "experience",
        message: `Experience ${idx + 1}: Only ${bullets.length} bullet(s)`,
        suggestion: "Aim for 3-5 bullet points per role",
      });
    }

    bullets.forEach((bullet, bIdx) => {
      const lower = bullet.toLowerCase().trim();

      const startsWithActionVerb = ACTION_VERBS.some((verb) =>
        lower.startsWith(verb)
      );
      if (!startsWithActionVerb) {
        issues.push({
          id: `experience-${idx}-bullet-${bIdx}-actionverb`,
          severity: "warning",
          category: "experience",
          message: `Bullet starts weakly: "${bullet.slice(0, 40)}..."`,
          suggestion: "Start with a strong action verb (Led, Built, Designed, etc.)",
        });
      }

      const hasWeakWord = WEAK_WORDS.some((weak) => lower.includes(weak));
      if (hasWeakWord) {
        issues.push({
          id: `experience-${idx}-bullet-${bIdx}-weak`,
          severity: "warning",
          category: "experience",
          message: `Bullet uses weak language: "${bullet.slice(0, 40)}..."`,
          suggestion: "Replace 'responsible for' with 'Led', 'worked on' with 'Built'",
        });
      }

      if (!QUANTIFIED_PATTERN.test(bullet)) {
        issues.push({
          id: `experience-${idx}-bullet-${bIdx}-quantify`,
          severity: "info",
          category: "experience",
          message: `Bullet has no numbers: "${bullet.slice(0, 40)}..."`,
          suggestion: "Add metrics (%, $, numbers) — e.g., 'increased sales by 30%'",
        });
      }
    });
  });

  return issues;
}

export function checkEducation(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const education = resume.education || [];

  if (education.length === 0) {
    issues.push({
      id: "education-empty",
      severity: "critical",
      category: "education",
      message: "No education listed",
      suggestion: "Add your degree — even current education counts",
    });
    return issues;
  }

  education.forEach((edu, idx) => {
    if (!edu.institution) {
      issues.push({
        id: `education-${idx}-institution`,
        severity: "warning",
        category: "education",
        message: `Education ${idx + 1}: Institution name missing`,
        suggestion: "Add your college/university name",
      });
    }
    if (!edu.degree) {
      issues.push({
        id: `education-${idx}-degree`,
        severity: "warning",
        category: "education",
        message: `Education ${idx + 1}: Degree missing`,
        suggestion: "Add degree (e.g., B.Tech, MBA)",
      });
    }
    if (!edu.field) {
      issues.push({
        id: `education-${idx}-field`,
        severity: "info",
        category: "education",
        message: `Education ${idx + 1}: Field of study missing`,
        suggestion: "Add field (e.g., Computer Science)",
      });
    }
  });

  return issues;
}

export function checkSkills(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const skills = (resume.skills || []).filter((s) => s && s.trim());

  if (skills.length === 0) {
    issues.push({
      id: "skills-empty",
      severity: "critical",
      category: "skills",
      message: "No skills listed",
      suggestion: "Add 8-15 relevant skills — ATS heavily relies on keyword matching",
    });
  } else if (skills.length < 5) {
    issues.push({
      id: "skills-few",
      severity: "warning",
      category: "skills",
      message: `Only ${skills.length} skills listed`,
      suggestion: "Add more skills — aim for 8-15 relevant ones",
    });
  } else if (skills.length > 25) {
    issues.push({
      id: "skills-too-many",
      severity: "info",
      category: "skills",
      message: `${skills.length} skills listed — too many`,
      suggestion: "Focus on 10-20 most relevant skills. Quality > quantity",
    });
  }

  return issues;
}

export function checkSummary(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const summary = resume.personal?.summary;

  if (!summary || summary.trim().length === 0) {
    issues.push({
      id: "summary-empty",
      severity: "warning",
      category: "content",
      message: "Professional summary is missing",
      suggestion: "Add a 2-3 line summary highlighting your experience and goals",
    });
  } else if (summary.length < 50) {
    issues.push({
      id: "summary-short",
      severity: "info",
      category: "content",
      message: "Professional summary is too short",
      suggestion: "Aim for 40-80 words that hook the recruiter",
    });
  } else if (summary.length > 500) {
    issues.push({
      id: "summary-long",
      severity: "info",
      category: "content",
      message: "Professional summary is too long",
      suggestion: "Keep it under 80 words — recruiters skim, not read",
    });
  }

  return issues;
}

export function checkProjects(resume: ResumeData): ATSIssue[] {
  const issues: ATSIssue[] = [];
  const projects = resume.projects || [];

  if (projects.length > 0) {
    projects.forEach((proj, idx) => {
      if (!proj.name) {
        issues.push({
          id: `projects-${idx}-name`,
          severity: "info",
          category: "content",
          message: `Project ${idx + 1}: Name missing`,
          suggestion: "Give each project a clear, descriptive name",
        });
      }
      if (!proj.description || proj.description.length < 20) {
        issues.push({
          id: `projects-${idx}-description`,
          severity: "info",
          category: "content",
          message: `Project ${idx + 1}: Description too short`,
          suggestion: "Describe what the project does and your role in 1-2 lines",
        });
      }
    });
  }

  return issues;
}