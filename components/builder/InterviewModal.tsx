"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X, Sparkles, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useResumeStore } from "@/lib/resumeStore";

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InterviewModal({ isOpen, onClose }: InterviewModalProps) {
  const { data } = useResumeStore();
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"start" | "questions" | "feedback">("start");

  if (!isOpen) return null;

  const handleStart = async () => {
    if (!jobTitle.trim()) return toast.error("Please enter a job title");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "generate_questions", 
          jobTitle, 
          resumeData: data 
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      if (result.questions && result.questions.length > 0) {
        setQuestions(result.questions);
        setStep("questions");
        setCurrentQIndex(0);
      } else {
        throw new Error("No questions generated");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) return toast.error("Please type your answer");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "evaluate_answer", 
          question: questions[currentQIndex], 
          answer 
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setFeedback(result.feedback);
      setStep("feedback");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setFeedback(null);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setStep("questions");
    } else {
      toast.success("Interview Practice Completed! 🎉");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[400px]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">AI Mock Interview</h2>
              <p className="text-xs text-slate-500">Practice your interview skills with AI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col">
          
          {/* START STATE */}
          {step === "start" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Target Job Role</label>
                <input
                  type="text"
                  placeholder="e.g., Frontend Developer"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleStart} 
                disabled={loading} 
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Start Interview Practice
              </Button>
            </div>
          )}

          {/* QUESTIONS STATE */}
          {step === "questions" && questions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{jobTitle}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium">
                {questions[currentQIndex]}
              </div>
              <textarea
                placeholder="Type your answer here..."
                className="w-full p-3 border border-slate-200 rounded-xl text-sm h-32 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button 
                onClick={handleEvaluate} 
                disabled={loading} 
                className="w-full h-12 bg-slate-900 hover:bg-black text-white"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Answer"}
              </Button>
            </div>
          )}

          {/* FEEDBACK STATE */}
          {step === "feedback" && feedback && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium">
                {questions[currentQIndex]}
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-green-800 mb-1">AI Feedback</h4>
                  <p className="text-sm text-green-700 leading-relaxed">{feedback}</p>
                </div>
              </div>
              <Button 
                onClick={handleNext} 
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {currentQIndex < questions.length - 1 ? "Next Question" : "Finish Practice"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}