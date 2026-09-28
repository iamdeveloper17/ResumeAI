import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience {
  _id: mongoose.Types.ObjectId;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface IEducation {
  _id: mongoose.Types.ObjectId;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface ISkill {
  _id: mongoose.Types.ObjectId;
  category: string;
  items: string[];
}

export interface IProject {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface ICertification {
  _id: mongoose.Types.ObjectId;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface IResume extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  isPublic: boolean;
  template: "modern" | "classic" | "minimal" | "creative";
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
    photo: string;
  };

  experience: IExperience[];
  education: IEducation[];
  skills: ISkill[];
  projects: IProject[];
  certifications: ICertification[];
  languages: { _id: mongoose.Types.ObjectId; name: string; proficiency: string }[];

  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      enum: ["modern", "classic", "minimal", "creative"],
      default: "modern",
    },
    accentColor: {
      type: String,
      default: "#3465ff",
    },
    personal: {
      fullName: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      website: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      summary: { type: String, default: "" },
      photo: { type: String, default: "" },
    },
    experience: [
      {
        company: { type: String, default: "" },
        position: { type: String, default: "" },
        location: { type: String, default: "" },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        current: { type: Boolean, default: false },
        bullets: { type: [String], default: [""] },
      },
    ],
    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        field: { type: String, default: "" },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        grade: { type: String, default: "" },
      },
    ],
    skills: [
      {
        category: { type: String, default: "" },
        items: { type: [String], default: [""] },
      },
    ],
    projects: [
      {
        name: { type: String, default: "" },
        description: { type: String, default: "" },
        techStack: { type: [String], default: [""] },
        link: { type: String, default: "" },
      },
    ],
    certifications: [
      {
        name: { type: String, default: "" },
        issuer: { type: String, default: "" },
        date: { type: String, default: "" },
        link: { type: String, default: "" },
      },
    ],
    languages: [
      {
        name: { type: String, default: "" },
        proficiency: { type: String, default: "Fluent" },
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;