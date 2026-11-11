"use client";
import React, { useEffect, useState } from "react";
import {
  Bold,
  Highlighter,
  Italic,
  Minus,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  Sparkles,
  Volume2,
  VolumeX,
  Network,
  ShieldCheck,
  Shield,
} from "lucide-react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { chatSession } from "@/configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import DiagramModal from "./DiagramModal";
import { usePrivacy } from "@/components/SolanaProvider";
import { encrypt, decrypt } from "@/lib/encryption";

function EditiorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const { aesKey, isPrivacyActive } = usePrivacy();
  const [update, setUpdate] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [diagramText, setDiagramText] = useState("");

  // ── Diagram ─────────────────────────────────────────────────────────────────
  const onDiagramClick = () => {
    const selectedText = editor.state.doc
      .textBetween(editor.state.selection.from, editor.state.selection.to, " ")
      .trim();
    if (!selectedText) {
      toast("Please select some text first to generate a diagram.");
      return;
    }
    setDiagramText(selectedText);
    setShowDiagram(true);
  };

  // ── Text-to-Speech ───────────────────────────────────────────────────────────
  const onSpeakClick = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    if (!selectedText.trim()) return;

    const plainText = selectedText.replace(/<[^>]*>/g, "");
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = "en-GB";

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleKeywords = [
        "female", "woman", "zira", "hazel",
        "google uk english female", "samantha", "victoria",
      ];
      const female = voices.find(
        (v) =>
          femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw)) &&
          v.lang.startsWith("en")
      );
      const englishFallback =
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices.find((v) => v.lang.startsWith("en"));
      utterance.voice = female || englishFallback || null;
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      pickVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        pickVoice();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const onStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // ── Helper: Save notes (with optional encryption) ───────────────────────────
  const saveNotesEncrypted = async (htmlContent) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email || !fileId) return;

    let contentToSave = htmlContent;
    if (isPrivacyActive && aesKey) {
      contentToSave = await encrypt(htmlContent, aesKey);
    }
    await saveNotes({ notes: contentToSave, fileId, createdBy: email });
  };

  // ── Auto-Save ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!editor) return;
    let timeoutId;

    const handler = () => {
      setUpdate((u) => u + 1);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const content = editor.getHTML();
        if (content && fileId) {
          setIsSaving(true);
          saveNotesEncrypted(content).finally(() => setIsSaving(false));
        }
      }, 2000);
    };

    editor.on("update", handler);
    editor.on("selectionUpdate", handler);
    return () => {
      clearTimeout(timeoutId);
      editor.off("update", handler);
      editor.off("selectionUpdate", handler);
    };
  }, [editor, fileId, saveNotes, user, aesKey, isPrivacyActive]);

  // ── AI Answer ────────────────────────────────────────────────────────────────
  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("selectedText", selectedText);

    try {
      const result = await SearchAI({ query: selectedText, fileId });
      const UnformattedAns = JSON.parse(result);
      let AllUnformattedAns = "";

      if (UnformattedAns && UnformattedAns.length > 0) {
        for (const item of UnformattedAns) {
          let chunkText = item.pageContent;

          // If privacy is active, the stored text may be encrypted.
          // Try to decrypt it.
          if (isPrivacyActive && aesKey) {
            try {
              chunkText = await decrypt(chunkText, aesKey);
            } catch {
              // If decryption fails, the chunk may have been stored in
              // plaintext (before privacy was enabled). Use as-is.
            }
          }

          AllUnformattedAns += chunkText;
        }
      }

      const PROMT =
        "For question :" +
        selectedText +
        " and with the given content as answer," +
        " please give appropriate answer in HTML format. The answer content is: " +
        AllUnformattedAns;

      const AiModelResult = await chatSession.sendMessage(PROMT);
      const FinalAns = AiModelResult.response
        .text()
        .replace("``````", "")
        .replace("html", "")
        .replace("```", "")
        .replace("```", "");

      const AllText = editor.getHTML();
      editor.commands.setContent(
        AllText + "<p> <strong>Answer: </strong>" + FinalAns + " </p>"
      );

      await saveNotesEncrypted(editor.getHTML());
    } catch (error) {
      toast.error("Failed to fetch AI answer");
      console.error(error);
    }
  };

  if (!editor) return null;

  return (
    <>
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-3 flex-wrap items-center">

            {/* Saving indicator */}
            {isSaving && (
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Saving...
              </div>
            )}

            {/* Privacy indicator (inline) */}
            {isPrivacyActive ? (
              <div className="text-xs text-green-600 flex items-center gap-1" title="Notes are E2E encrypted">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="text-xs text-gray-400 flex items-center gap-1" title="Connect wallet for E2E encryption">
                <Shield className="w-3.5 h-3.5" />
              </div>
            )}

            {/* Bold */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
              title="Bold"
            >
              <Bold />
            </button>

            {/* Italic */}
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
              title="Italic"
            >
              <Italic />
            </button>

            {/* Underline */}
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
              title="Underline"
            >
              <Underline />
            </button>

            {/* Highlight */}
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
              title="Highlight"
            >
              <Highlighter />
            </button>

            {/* H1 */}
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""}
              title="Heading 1"
            >
              <Heading1 />
            </button>

            {/* H2 */}
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""}
              title="Heading 2"
            >
              <Heading2 />
            </button>

            {/* H3 */}
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""}
              title="Heading 3"
            >
              <Heading3 />
            </button>

            {/* Horizontal Rule */}
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
              <Minus />
            </button>

            {/* Bullet List */}
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "text-blue-500" : ""}
              title="Bullet list"
            >
              <List />
            </button>

            {/* Align Left */}
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""}
              title="Align left"
            >
              <AlignLeft />
            </button>

            {/* Align Center */}
            <button
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""}
              title="Align center"
            >
              <AlignCenter />
            </button>

            {/* Align Right */}
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""}
              title="Align right"
            >
              <AlignRight />
            </button>

            {/* Align Justify */}
            <button
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              className={editor.isActive({ textAlign: "justify" }) ? "text-blue-500" : ""}
              title="Justify"
            >
              <AlignJustify />
            </button>

            {/* AI Answer */}
            <button
              onClick={onAiClick}
              className="hover:text-blue-500 transition-colors"
              title="Ask AI about selection"
            >
              <Sparkles />
            </button>

            {/* Text-to-Speech */}
            {isSpeaking ? (
              <button
                onClick={onStopSpeaking}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Stop speaking"
              >
                <VolumeX />
              </button>
            ) : (
              <button
                onClick={onSpeakClick}
                className="hover:text-purple-500 transition-colors"
                title="Read selected text aloud"
              >
                <Volume2 />
              </button>
            )}

            {/* Visualize as Diagram */}
            <button
              onClick={onDiagramClick}
              className="hover:text-green-500 transition-colors"
              title="Generate Mind Map"
            >
              <Network />
            </button>

          </div>
        </div>
      </div>

      {/* Diagram Modal */}
      {showDiagram && (
        <DiagramModal
          selectedText={diagramText}
          onClose={() => setShowDiagram(false)}
        />
      )}
    </>
  );
}

export default EditiorExtension;
