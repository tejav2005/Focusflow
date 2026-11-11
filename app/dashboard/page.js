"use client";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
import {
  Trash2,
  FileText,
  Plus,
  Folder,
  ArrowRight,
  Database,
  Shield,
  ShieldCheck,
  Search,
  ExternalLink,
  Loader2,
} from "lucide-react";
import UploadPdfDialog from "./_components/UploadPdfDialog";
import { usePrivacy } from "@/components/SolanaProvider";
import Link from "next/link";

function Dashboard() {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isPrivacyActive } = usePrivacy();

  // Query user info
  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  // Query user files
  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    user?.primaryEmailAddress?.emailAddress
      ? { userEmail: user.primaryEmailAddress.emailAddress }
      : undefined
  );

  const deleteFile = useMutation(api.fileStorage.deleteFile);

  const handleDelete = async (file, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!GetUserInfo?.upgrade) {
      toast.info("File deletion is available on the Pro plan. Please upgrade to manage storage.");
      return;
    }

    if (!confirm(`Are you sure you want to delete "${file.fileName}"?`)) return;

    try {
      setIsDeleting(true);
      await deleteFile({
        storageId: file.storageId,
        fileId: file.fileId,
        userEmail: user.primaryEmailAddress.emailAddress,
      });
      toast.success("Document deleted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  const isMaxFile = (fileList?.length || 0) >= 5 && !GetUserInfo?.upgrade;

  const filteredFiles = fileList
    ? fileList.filter((f) =>
        f.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
              <Folder className="w-7 h-7" />
            </span>
            Document Workspace
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access, inspect, and extract AI insights from your uploaded documents.
          </p>
        </div>

        {/* Upload Trigger Button */}
        <div>
          <UploadPdfDialog isMaxFile={isMaxFile}>
            <button
              disabled={isMaxFile}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span>Upload PDF</span>
            </button>
          </UploadPdfDialog>
        </div>
      </div>

      {/* Stats Cards (Rendered once fileList is loaded) */}
      {fileList !== undefined && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{fileList.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Active files</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimated Storage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(fileList.length * 2.5).toFixed(1)} <span className="text-sm font-medium text-gray-500">MB</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Cloud indexed</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan Status</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {GetUserInfo?.upgrade ? "Pro Member" : "Free Plan"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {GetUserInfo?.upgrade ? "Unlimited uploads" : `${Math.max(0, 5 - fileList.length)} uploads left`}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Zero-Knowledge</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {isPrivacyActive ? "Active" : "Standard"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isPrivacyActive ? "Encrypted with Solana" : "Connect wallet"}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPrivacyActive ? "bg-emerald-50 text-emerald-600" : "bg-purple-50 text-purple-600"}`}>
              {isPrivacyActive ? <ShieldCheck className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div>
        {/* Search bar & count */}
        {fileList && fileList.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>Your Library</span>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {filteredFiles.length}
              </span>
            </h2>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* 1. Loading State */}
        {fileList === undefined && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-56 bg-white/60 rounded-3xl p-6 border border-gray-200/60 shadow-xs animate-pulse flex flex-col justify-between"
              >
                <div className="w-16 h-20 bg-gray-200 rounded-xl mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-100 rounded-md w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Empty State */}
        {fileList !== undefined && fileList.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 p-12 text-center shadow-xs max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <FileText className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">No documents yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Upload your lecture notes, research papers, or study guides to unlock AI summarization, questions, and note-taking.
            </p>

            <UploadPdfDialog isMaxFile={false}>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Upload First PDF</span>
              </button>
            </UploadPdfDialog>

            <div className="mt-8 pt-6 border-t border-gray-100 text-left bg-indigo-50/50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-indigo-900 mb-1">🔒 Zero-Knowledge Privacy Note</p>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Connect your Solana wallet in the top bar to enable End-to-End Encryption. When active, all extracted text is encrypted directly in your browser with your wallet key before being saved.
              </p>
            </div>
          </div>
        )}

        {/* 3. Populated Files Grid */}
        {fileList && fileList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Quick Upload Card */}
            <UploadPdfDialog isMaxFile={isMaxFile}>
              <div
                className={`h-60 rounded-3xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-xs ${
                  isMaxFile ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-3">
                  <Plus className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm group-hover:text-indigo-700">Add New Document</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {isMaxFile ? "Upgrade to add more files" : "Click to select a PDF"}
                </p>
              </div>
            </UploadPdfDialog>

            {/* Document Cards */}
            {filteredFiles.map((file) => (
              <div
                key={file.fileId}
                className="group relative h-60 bg-white rounded-3xl p-6 border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Delete button (top right) */}
                <button
                  onClick={(e) => handleDelete(file, e)}
                  disabled={isDeleting}
                  title={GetUserInfo?.upgrade ? "Delete document" : "Pro feature: Upgrade to delete"}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Main Card Link to Workspace */}
                <Link
                  href={`/workspace/${file.fileId}`}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-bold text-gray-800 text-sm line-clamp-2 px-2 group-hover:text-indigo-600 transition-colors">
                    {file.fileName}
                  </h3>

                  <span className="text-[11px] font-medium text-gray-400 mt-1">
                    PDF Document
                  </span>
                </Link>

                {/* Bottom Footer inside card */}
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                  <span className="text-[11px] text-gray-400">Ready</span>
                  <Link
                    href={`/workspace/${file.fileId}`}
                    className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search empty state */}
        {fileList && fileList.length > 0 && filteredFiles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-8">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">No matching documents</p>
            <p className="text-xs text-gray-400 mt-1">Try searching with a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
