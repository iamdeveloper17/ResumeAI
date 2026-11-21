"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore, emptyResume } from "@/lib/resumeStore";
import { Loader2 } from "lucide-react";

export default function NewResumePage() {
  const router = useRouter();
  const { setResumeId, setData, setStep } = useResumeStore();

  useEffect(() => {
    setResumeId(null);
    setData(emptyResume);
    setStep(0);
    router.replace("/build/new");
  }, [router, setResumeId, setData, setStep]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        {/* 🎯 Loader color updated to primary */}
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        {/* 🎯 Text color updated for dark mode */}
        <p className="text-sm text-muted-foreground">Starting new resume...</p>
      </div>
    </div>
  );
}