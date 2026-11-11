"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon, ShieldCheck, Shield, UploadCloud } from "lucide-react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { usePrivacy } from "@/components/SolanaProvider";
import { encrypt } from "@/lib/encryption";
import axios from "axios";

/**
 * Parse a PDF File object entirely in the browser.
 * Returns a single string of all page text.
 */
async function parsePdfInBrowser(file) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + " ";
  }
  return fullText.trim();
}

/**
 * Split text into overlapping chunks.
 */
function splitText(text, chunkSize = 100, overlap = 20) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }
  return chunks;
}

function UploadPdfDialog({ children, isMaxFile, open: externalOpen, onOpenChange: externalOnOpenChange }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const { aesKey, isPrivacyActive } = usePrivacy();

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? (externalOnOpenChange || (() => {})) : setInternalOpen;

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const resetState = () => {
    setFile(null);
    setFileName("");
    setLoading(false);
  };

  const handleOpenChange = (val) => {
    if (!loading) {
      setOpen(val);
      if (!val) resetState();
    }
  };

  const OnFileSelect = (event) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (!fileName) {
        setFileName(selected.name.replace(/\.pdf$/i, ""));
      }
    }
  };

  const OnUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }

    setLoading(true);

    let fileId;
    let fileUrl;
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type || "application/pdf" },
        body: file,
      });
      const { storageId } = await result.json();
      fileId = uuid4();
      fileUrl = await getFileUrl({ storageId });

      await addFileEntry({
        fileId,
        storageId,
        fileName: fileName.trim() || file.name || "Untitled Document",
        fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      toast.success("File uploaded successfully! Processing AI context…");
      resetState();
      setOpen(false);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed: " + (err.message || "Unknown error"));
      setLoading(false);
      return;
    }

    // Phase 2: Ingest into vector store
    try {
      let chunksToStore = [];
      try {
        const fullText = await parsePdfInBrowser(file);
        if (fullText) {
          chunksToStore = splitText(fullText, 100, 20);
        }
      } catch (clientErr) {
        console.warn("Client parse fallback to server loader:", clientErr);
        if (fileUrl) {
          const apiResp = await axios.get("/api/pdf-loader?pdfUrl=" + encodeURIComponent(fileUrl));
          chunksToStore = apiResp.data?.result || [];
        }
      }

      if (isPrivacyActive && aesKey && chunksToStore.length > 0) {
        chunksToStore = await Promise.all(
          chunksToStore.map((chunk) => encrypt(chunk, aesKey))
        );
      }

      if (chunksToStore.length > 0) {
        await embeddDocument({ splitText: chunksToStore, fileId });
        toast.success(
          isPrivacyActive
            ? "Document ready with Zero-Knowledge encryption! 🔒"
            : "Document indexed and AI search is ready!"
        );
      }
    } catch (err) {
      console.error("Embedding warning:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children ? (
        <DialogTrigger asChild disabled={isMaxFile}>
          {children}
        </DialogTrigger>
      ) : !isControlled ? (
        <DialogTrigger asChild>
          <Button disabled={isMaxFile} className="w-full">
            + Upload PDF File
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-2xl rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">Upload PDF Document</DialogTitle>
              <p className="text-xs text-gray-500">Add a document to your intelligent workspace</p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Select PDF File *
              </label>
              <div className="border-2 border-dashed border-gray-200 hover:border-indigo-400 rounded-2xl p-4 transition-colors bg-gray-50/50">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={OnFileSelect}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Document Name *
              </label>
              <Input
                placeholder="e.g. Q3 Financial Report, Lecture Notes"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="h-11 rounded-xl border-gray-200 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs">
              {isPrivacyActive ? (
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  E2E Privacy Active — Encrypted with your wallet key
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  Standard storage (connect Solana wallet for E2E encryption)
                </span>
              )}
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="sm:justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="rounded-xl">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={OnUpload}
            disabled={loading || !file || isMaxFile}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              "Upload Document"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
