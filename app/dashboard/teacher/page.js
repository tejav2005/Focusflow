"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  GraduationCap,
  Play,
  Square,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Wifi,
  WifiOff,
  Activity,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import LiveFocusMeter from "./_components/LiveFocusMeter";
import FocusTrendChart from "./_components/FocusTrendChart";
import AttentionHeatmap from "./_components/AttentionHeatmap";
import AdaptationStats from "./_components/AdaptationStats";
import EngagementDistribution from "./_components/EngagementDistribution";
import PrivacyPanel from "./_components/PrivacyPanel";
import Link from "next/link";

export default function TeacherDashboard() {
  const { user, isLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Safe timeout so page NEVER hangs on infinite loading spinner
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [activeSessionLocal, setActiveSessionLocal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [currentFocus, setCurrentFocus] = useState(78);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [demoRole, setDemoRole] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimedOut(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Convex queries with skip to prevent blocking
  const userInfo = useQuery(
    api.user.GetUserInfo,
    userEmail ? { userEmail } : "skip"
  );

  const userFiles = useQuery(
    api.fileStorage.GetUserFiles,
    userEmail ? { userEmail } : "skip"
  );

  const teacherSessions = useQuery(
    api.attention.getTeacherSessions,
    userEmail ? { teacherId: userEmail } : "skip"
  );

  const setTeacherRole = useMutation(api.user.setTeacherRole);
  const createSession = useMutation(api.attention.createSession);
  const endSession = useMutation(api.attention.endSession);
  const logAttention = useMutation(api.attention.logAttention);
  const logAdaptation = useMutation(api.attention.logAdaptation);

  const activeDbSession = teacherSessions?.find((s) => s.active);
  const isClassActive = activeSessionLocal || !!activeDbSession;

  // Set default document if available
  useEffect(() => {
    if (userFiles?.length > 0 && !selectedFileId) {
      setSelectedFileId(userFiles[0].fileId);
    }
  }, [userFiles, selectedFileId]);

  // Subtle real-time attention drift simulation while session is running
  useEffect(() => {
    if (!isClassActive) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 5;
      setCurrentFocus((prev) => Math.min(98, Math.max(45, Math.round(prev + delta))));
    }, 3500);
    return () => clearInterval(interval);
  }, [isClassActive]);

  const handleToggleTeacherRole = async (enable) => {
    setDemoRole(enable);
    if (!userEmail) return;
    try {
      setIsUpdatingRole(true);
      await setTeacherRole({ userEmail, isTeacher: enable });
      toast.success(enable ? "Teacher mode active!" : "Switched to student view.");
    } catch (err) {
      // Local fallback in case Convex dev backend is not running
      toast.info(enable ? "Teacher view enabled." : "Student view enabled.");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleStartSession = async () => {
    setActiveSessionLocal(true);
    toast.success("Live classroom session started!");

    if (userEmail && selectedFileId) {
      try {
        const sessionId = await createSession({
          teacherId: userEmail,
          fileId: selectedFileId,
        });
        await logAttention({ sessionId, focusScore: 82 });
        await logAdaptation({ sessionId, type: "Session Initialized" });
      } catch (err) {
        console.warn("Convex session create skipped (local mode):", err);
      }
    }
  };

  const handleEndSession = async () => {
    setActiveSessionLocal(false);
    toast.info("Classroom session ended.");

    if (activeDbSession) {
      try {
        await endSession({ sessionId: activeDbSession._id });
      } catch (err) {
        console.warn("Convex session end error:", err);
      }
    }
  };

  const handleSimulatePulse = async () => {
    if (!isClassActive) {
      toast.info("Start a live session first to stream attention telemetry.");
      return;
    }
    setIsSimulating(true);
    const score = Math.round(62 + Math.random() * 32);
    setCurrentFocus(score);

    const adaptations = [
      "Simplified Explanation Generated",
      "Key Concept Highlight Pulled",
      "Audio Synthesis Prompt Triggered",
      "Interactive Quiz Prompt Created",
    ];
    const adaptation = adaptations[Math.floor(Math.random() * adaptations.length)];

    if (activeDbSession) {
      try {
        await logAttention({ sessionId: activeDbSession._id, focusScore: score });
        await logAdaptation({ sessionId: activeDbSession._id, type: adaptation });
      } catch (err) {
        console.warn("Convex log attention skipped:", err);
      }
    }

    setTimeout(() => {
      setIsSimulating(false);
      toast.success(`Telemetry Pulse: ${score}% Focus • ${adaptation}`);
    }, 400);
  };

  // Determine if teacher role is active
  const isTeacherActive =
    userInfo?.isTeacher === true ||
    (userInfo === undefined && isTimedOut && demoRole) ||
    (userInfo && userInfo.isTeacher !== false && demoRole);

  // If still quickly loading (under 1.5s) and not ready, show clean skeleton
  if (!isTimedOut && userInfo === undefined && !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-600">Connecting to Classroom Intelligence...</p>
        </div>
      </div>
    );
  }

  // Non-teacher state (only if explicitly set to false and demo mode turned off)
  if (!isTeacherActive && !demoRole) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-indigo-100 max-w-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Educator & Classroom Analytics</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              The Teacher Dashboard lets you monitor real-time student engagement, aggregate focus scores, attention heatmaps, and zero-knowledge privacy compliant telemetry.
            </p>
          </div>

          <button
            onClick={() => handleToggleTeacherRole(true)}
            disabled={isUpdatingRole}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Enable Teacher Mode</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Teacher View
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black">Teacher Dashboard</h1>
                {isClassActive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-emerald-950 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-900" />
                    Live Class Streaming
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    Standby Mode
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm mt-1">
                Real-time student attention intelligence and dynamic learning analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleTeacherRole(!demoRole)}
              className="text-xs bg-white/15 hover:bg-white/25 text-white px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-white/20 font-medium"
            >
              {demoRole ? "Switch to Student View" : "Return to Teacher Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Session Controller */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Lesson Material:</span>
            </div>
            <select
              value={selectedFileId}
              onChange={(e) => setSelectedFileId(e.target.value)}
              disabled={isClassActive}
              className="px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800 disabled:opacity-60 cursor-pointer max-w-xs"
            >
              {userFiles && userFiles.length > 0 ? (
                userFiles.map((file) => (
                  <option key={file.fileId} value={file.fileId}>
                    {file.fileName}
                  </option>
                ))
              ) : (
                <option value="demo-pdf">Computer Science 101 - Operating Systems.pdf</option>
              )}
            </select>
          </div>

          {/* Session Action Buttons */}
          <div className="flex items-center gap-3">
            {!isClassActive ? (
              <button
                onClick={handleStartSession}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Live Session</span>
              </button>
            ) : (
              <button
                onClick={handleEndSession}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>End Session</span>
              </button>
            )}

            <button
              onClick={handleSimulatePulse}
              disabled={isSimulating || !isClassActive}
              title="Stream a live student attention reading to see analytics update"
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-200/80 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>Simulate Pulse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LiveFocusMeter focusScore={currentFocus} />
        <FocusTrendChart />
      </div>

      {/* Attention Heatmap by Content Section */}
      <AttentionHeatmap />

      {/* Telemetry Breakdown & Privacy Shield */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdaptationStats />
        <EngagementDistribution />
        <PrivacyPanel />
      </div>
    </div>
  );
}
