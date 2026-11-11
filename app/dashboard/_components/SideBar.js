"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout, Shield, Upload, Star, Zap, GraduationCap, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar() {
  const { user } = useUser();
  const path = usePathname();
  const [isClient, setIsClient] = useState(false);

  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    user?.primaryEmailAddress?.emailAddress
      ? { userEmail: user.primaryEmailAddress.emailAddress }
      : undefined
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const documentCount = fileList?.length || 0;
  const isMaxFile = documentCount >= 5 && !GetUserInfo?.upgrade;

  return (
    <div className="h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden border-r border-gray-200/50 shadow-2xl flex flex-col justify-between">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-100/20 via-indigo-50/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-50/20 via-pink-50/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Logo Section */}
        <div className="mb-6">
          <Link href="/dashboard" className="block">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={`w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md ${
                      isClient ? "animate-pulse" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-white drop-shadow-sm"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    FocusFlow
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">AI PDF Workspace</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Upload Button */}
        <div className="mb-6">
          <UploadPdfDialog isMaxFile={isMaxFile}>
            <Button
              disabled={isMaxFile}
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </Button>
          </UploadPdfDialog>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link href="/dashboard">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                path === "/dashboard"
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 shadow-sm text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-white/80 hover:text-gray-900 border border-transparent font-medium"
              }`}
            >
              <Layout className={`w-5 h-5 ${path === "/dashboard" ? "text-blue-600" : "text-gray-500"}`} />
              <span className="text-sm">Workspace</span>
              {path === "/dashboard" && (
                <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
          </Link>

          {/* Teacher Dashboard navigation item */}
          <Link href="/dashboard/teacher">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                path === "/dashboard/teacher"
                  ? "bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 shadow-sm text-teal-700 font-semibold"
                  : "text-gray-600 hover:bg-white/80 hover:text-gray-900 border border-transparent font-medium"
              }`}
            >
              <GraduationCap className={`w-5 h-5 ${path === "/dashboard/teacher" ? "text-teal-600" : "text-gray-500"}`} />
              <span className="text-sm">Teacher Mode</span>
              {GetUserInfo?.isTeacher ? (
                <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Active
                </span>
              ) : (
                <span className="ml-auto text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200/60 px-1.5 py-0.5 rounded-md">
                  Educator
                </span>
              )}
            </div>
          </Link>

          <Link href="/dashboard/upgrade">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                path === "/dashboard/upgrade"
                  ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-sm text-amber-700 font-semibold"
                  : "text-gray-600 hover:bg-white/80 hover:text-gray-900 border border-transparent font-medium"
              }`}
            >
              <Shield className={`w-5 h-5 ${path === "/dashboard/upgrade" ? "text-amber-600" : "text-gray-500"}`} />
              <span className="text-sm">Upgrade Plan</span>
              <div className="ml-auto flex items-center gap-1">
                <Crown className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </Link>
        </nav>
      </div>

      {/* Storage Usage Card (for free tier) */}
      {!GetUserInfo?.upgrade && (
        <div className="relative z-10 pt-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-gray-800">Storage Usage</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {documentCount} / 5
              </span>
            </div>

            <Progress
              value={Math.min(100, (documentCount / 5) * 100)}
              className="h-2 bg-gray-100"
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                {5 - documentCount > 0 ? `${5 - documentCount} slots left` : "Storage full"}
              </span>
              <Link
                href="/dashboard/upgrade"
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
              >
                <span>Upgrade</span>
                <Star className="w-3 h-3 fill-indigo-600 text-indigo-600" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
