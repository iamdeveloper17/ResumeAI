// Suggestions database for resume fields

export const SKILL_SUGGESTIONS = [
  // Frontend
  "React", "React.js", "Next.js", "Vue.js", "Angular", "Svelte",
  "TypeScript", "JavaScript", "HTML", "CSS", "SASS", "TailwindCSS",
  "Redux", "Zustand", "React Query", "Framer Motion",
  
  // Backend
  "Node.js", "Express.js", "NestJS", "FastAPI", "Django", "Flask",
  "GraphQL", "REST API", "WebSockets", "gRPC",
  
  // Databases
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase",
  "Prisma", "Mongoose", "SQL", "NoSQL",
  
  // DevOps
  "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Vercel", "Netlify",
  "GitHub Actions", "CI/CD", "Nginx", "Linux",
  
  // Languages
  "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift",
  "Kotlin", "Dart", "R",
  
  // Mobile
  "React Native", "Flutter", "iOS", "Android",
  
  // Tools
  "Git", "GitHub", "GitLab", "VS Code", "Figma", "Postman", "Jira",
  "Notion", "Slack",
  
  // Data & AI
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
  "Pandas", "NumPy", "OpenAI", "LangChain", "Data Analysis",
  
  // Soft skills
  "Communication", "Team Leadership", "Problem Solving", "Time Management",
  "Critical Thinking", "Adaptability", "Collaboration", "Mentoring",
];

export const DEGREE_SUGGESTIONS = [
  "B.Tech", "B.E.", "B.Sc", "B.Com", "B.A.", "BCA", "BBA", "B.Arch",
  "M.Tech", "M.E.", "M.Sc", "M.Com", "M.A.", "MCA", "MBA", "M.Arch",
  "B.Des", "M.Des",
  "Diploma", "Advanced Diploma",
  "Ph.D.", "Post Doctorate",
  "12th (Senior Secondary)", "10th (Secondary)",
];

export const FIELD_SUGGESTIONS = [
  "Computer Science", "Information Technology", "Software Engineering",
  "Electronics & Communication", "Electrical Engineering",
  "Mechanical Engineering", "Civil Engineering", "Chemical Engineering",
  "Data Science", "Artificial Intelligence", "Machine Learning",
  "Business Administration", "Commerce", "Economics", "Finance",
  "Marketing", "Human Resources", "Accounting",
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English Literature", "History", "Psychology", "Sociology",
  "Graphic Design", "UI/UX Design", "Animation",
];

export const JOB_TITLE_SUGGESTIONS = [
  "Full Stack Developer", "Frontend Developer", "Backend Developer",
  "Software Engineer", "Senior Software Engineer", "Software Architect",
  "Web Developer", "Mobile App Developer", "React Developer",
  "Node.js Developer", "Python Developer", "Java Developer",
  "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer",
  "Data Scientist", "Data Analyst", "Machine Learning Engineer",
  "AI Engineer", "Business Analyst", "Product Manager",
  "Project Manager", "Technical Lead", "Engineering Manager",
  "UI Designer", "UX Designer", "Product Designer", "Graphic Designer",
  "QA Engineer", "Test Automation Engineer",
  "Digital Marketing Manager", "Content Writer", "SEO Specialist",
];

export const COMPANY_SUGGESTIONS = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
  "Flipkart", "Swiggy", "Zomato", "Paytm", "PhonePe", "Razorpay",
  "TCS", "Infosys", "Wipro", "HCL", "Cognizant", "Accenture",
  "Capgemini", "Deloitte", "EY", "KPMG", "PwC",
  "Adobe", "Salesforce", "Oracle", "SAP", "IBM",
  "Zoho", "Freshworks", "CRED", "Zepto", "Meesho",
  "Goldman Sachs", "JP Morgan", "Morgan Stanley",
];

export const INSTITUTION_SUGGESTIONS = [
  "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "NIT Trichy", "NIT Warangal", "NIT Surathkal",
  "BITS Pilani", "VIT Vellore", "Manipal Institute of Technology",
  "Delhi University", "Mumbai University", "Pune University",
  "Anna University", "Jadavpur University", "Amity University",
  "Lovely Professional University", "Chandigarh University",
  "IGNOU", "IIT Roorkee", "IIIT Hyderabad",
];

// Fuzzy search — typo ke saath bhi suggestions
export function fuzzyMatch(query: string, suggestions: string[]): string[] {
  if (!query || query.length < 1) return [];
  
  const q = query.toLowerCase().trim();
  
  // Exact prefix match first
  const prefixMatches = suggestions.filter((s) =>
    s.toLowerCase().startsWith(q)
  );
  
  // Contains match
  const containsMatches = suggestions.filter(
    (s) =>
      !s.toLowerCase().startsWith(q) && s.toLowerCase().includes(q)
  );
  
  // Fuzzy match — character order match (typo tolerance)
  const fuzzyMatches = suggestions.filter((s) => {
    if (prefixMatches.includes(s) || containsMatches.includes(s)) return false;
    
    const target = s.toLowerCase();
    let i = 0;
    for (const char of q) {
      const idx = target.indexOf(char, i);
      if (idx === -1) return false;
      i = idx + 1;
    }
    return true;
  });
  
  // Combine: prefix > contains > fuzzy, max 8 results
  return [...prefixMatches, ...containsMatches, ...fuzzyMatches].slice(0, 8);
}