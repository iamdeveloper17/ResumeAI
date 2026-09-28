import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up — ResumeAI",
};

export default function RegisterPage() {
  return <RegisterForm />;
}