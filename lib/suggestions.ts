// lib/suggestions.ts — Barrel file
// Actual data lives in ./data/suggestions-db.ts
// Ye file sirf re-export karti hai for cleaner imports

export {
  // Main exports
  SKILLS,
  DEGREES,
  FIELDS,
  JOB_TITLES,
  COMPANIES,
  INSTITUTIONS,
  CITIES,
  // Backward-compat aliases
  SKILL_SUGGESTIONS,
  DEGREE_SUGGESTIONS,
  FIELD_SUGGESTIONS,
  JOB_TITLE_SUGGESTIONS,
  COMPANY_SUGGESTIONS,
  INSTITUTION_SUGGESTIONS,
  // Search functions
  fuzzySearch,
} from "./data/suggestions-db";

// Alias for backward compatibility
export { fuzzySearch as fuzzyMatch } from "./data/suggestions-db";