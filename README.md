# 🎨 ResumeAI — AI-Powered Resume Builder

A modern, AI-powered resume builder built with Next.js 16, TypeScript, and Google Gemini AI. Create professional resumes in minutes with live preview, autocomplete suggestions, and PDF export.

![ResumeAI](./public/banner.png)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-9-green?logo=mongodb)](https://mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?logo=google)](https://ai.google.dev)

## ✨ Features

### Core
- 📝 **Multi-step resume builder** — Personal, Experience, Education, Skills, Projects
- 👁️ **Live preview** — See changes as you type
- 💾 **Auto-save** — Debounced saves to MongoDB every 2 seconds
- 🎨 **2 templates** — Modern & Classic designs
- 📄 **PDF export** — High-quality A4 print-ready resumes
- 🎯 **Smart validation** — Required field checks before proceeding

### Autocomplete & Intelligence
- 🏢 **Company suggestions** — Google, Microsoft, Amazon, Indian IT giants...
- 🎓 **Degree & Field** — B.Tech, MCA, Computer Science...
- 🏫 **Institution** — IITs, NITs, BITS, Delhi University...
- 💼 **Job Titles** — Full Stack Developer, Data Scientist, Product Manager...
- 🛠️ **200+ Skills** — React, Node.js, Python, AWS, Docker...
- 📍 **Cities** — Mumbai, Bangalore, San Francisco...
- 🔍 **Fuzzy matching** — Typo-tolerant search

### Auth & Data
- 🔐 **Authentication** — Email/password with NextAuth v5
- 📊 **Dashboard** — Manage all your resumes
- 🗄️ **MongoDB** — Cloud database with auto-save
- 📱 **Responsive** — Mobile, tablet, desktop

## 🚀 Tech Stack

**Frontend:**
- Next.js 16 (App Router, Server Components)
- TypeScript
- TailwindCSS v4
- shadcn/ui components
- React Hook Form + Zod
- Zustand (state management)
- Lucide icons

**Backend:**
- Next.js API Routes
- MongoDB + Mongoose
- NextAuth v5 (credentials)
- bcryptjs

**AI:**
- Google Gemini 2.5 Flash

## 📁 Project Structure
