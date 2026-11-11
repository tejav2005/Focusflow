"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Download, RefreshCw, GitBranch } from "lucide-react";
import { chatSession } from "@/configs/AIModel";

export default function DiagramModal({ selectedText, onClose }) {
    const containerRef = useRef(null);
    const [status, setStatus] = useState("generating"); // generating | rendering | done | error
    const [diagramCode, setDiagramCode] = useState("");
    const [diagramType, setDiagramType] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Step 1: Ask AI for mermaid code
    useEffect(() => {
        if (!selectedText?.trim()) return;
        generateDiagram(selectedText);
    }, [selectedText]);

    // Step 2: Render mermaid once we have code
    useEffect(() => {
        if (status === "rendering" && diagramCode && containerRef.current) {
            renderMermaid(diagramCode);
        }
    }, [status, diagramCode]);

    const generateDiagram = async (text) => {
        setStatus("generating");
        setErrorMsg("");
        try {
            const prompt = `You are a Mermaid.js diagram generator.
Based ONLY on the text below, generate a valid Mermaid diagram.

Preferred Type: "mindmap"
(Use "flowchart TD" only if the text describes a strict sequential process/steps).

CRITICAL SYNTAX RULES for "mindmap":
1. The first line must be exactly "mindmap".
2. EVERY node label MUST be wrapped in double quotes. Example: root("Root Name")
3. Use indentation (2 spaces) to show hierarchy.
4. Do NOT use parentheses () or brackets [] inside labels unless they are inside double quotes.

General Rules:
1. Return ONLY the raw Mermaid code. 
2. No markdown fences, no backticks, no explanations.
3. Maximum 15-20 nodes.
4. If a word contains special characters like ( ) , . - / , it MUST be in double quotes.

Text to visualize:
"""
${text}
"""`;

            const result = await chatSession.sendMessage(prompt);
            let raw = result.response.text().trim();

            // Strip markdown fences if AI added them anyway
            raw = raw.replace(/^```(?:mermaid)?\s*/i, "").replace(/```\s*$/i, "").trim();

            // Detect diagram type from first line
            const firstLine = raw.split("\n")[0].toLowerCase();
            if (firstLine.includes("mindmap")) setDiagramType("Mind Map");
            else if (firstLine.includes("flowchart") || firstLine.includes("graph")) setDiagramType("Flowchart");
            else if (firstLine.includes("sequence")) setDiagramType("Sequence Diagram");
            else setDiagramType("Diagram");

            setDiagramCode(raw);
            setStatus("rendering");
        } catch (err) {
            console.error("Diagram generation error:", err);
            setErrorMsg("Failed to generate diagram. Please try again.");
            setStatus("error");
        }
    };

    const renderMermaid = async (code) => {
        try {
            const mermaid = (await import("mermaid")).default;
            mermaid.initialize({
                startOnLoad: false,
                theme: "base",
                themeVariables: {
                    primaryColor: "#6366f1",
                    primaryTextColor: "#1e1b4b",
                    primaryBorderColor: "#4f46e5",
                    lineColor: "#6366f1",
                    secondaryColor: "#e0e7ff",
                    tertiaryColor: "#f5f3ff",
                    background: "#ffffff",
                    mainBkg: "#eef2ff",
                    nodeBorder: "#4f46e5",
                    clusterBkg: "#f5f3ff",
                    titleColor: "#1e1b4b",
                    edgeLabelBackground: "#e0e7ff",
                    fontSize: "16px",
                },
                flowchart: { curve: "basis", htmlLabels: true },
                mindmap: { padding: 16 },
                securityLevel: "loose",
            });

            const id = `mermaid-diagram-${Date.now()}`;
            const { svg } = await mermaid.render(id, code);

            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
                // Make SVG responsive
                const svgEl = containerRef.current.querySelector("svg");
                if (svgEl) {
                    svgEl.style.maxWidth = "100%";
                    svgEl.style.height = "auto";
                }
            }
            setStatus("done");
        } catch (err) {
            console.error("Mermaid render error:", err);
            setErrorMsg(`Render error: ${err.message}`);
            setStatus("error");
        }
    };

    const handleRetry = () => {
        if (containerRef.current) containerRef.current.innerHTML = "";
        generateDiagram(selectedText);
    };

    const handleDownload = () => {
        if (!containerRef.current) return;
        const svgEl = containerRef.current.querySelector("svg");
        if (!svgEl) return;
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${diagramType || "diagram"}.svg`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15, 10, 40, 0.75)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                style={{
                    background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
                    maxHeight: "90vh",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/30">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-500/30 rounded-xl flex items-center justify-center">
                            <GitBranch className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg leading-tight">Visual Diagram</h2>
                            {diagramType && (
                                <span className="text-indigo-300 text-xs font-medium">{diagramType}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {status === "done" && (
                            <>
                                <button
                                    onClick={handleRetry}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 transition-all text-sm font-medium"
                                    title="Regenerate"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Regenerate
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-sm font-medium"
                                    title="Download SVG"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Download
                                </button>
                            </>
                        )}
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Generating state */}
                    {status === "generating" && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-400 animate-spin"></div>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold text-lg">Generating diagram…</p>
                                <p className="text-indigo-300 text-sm mt-1">AI is analyzing your selection</p>
                            </div>
                        </div>
                    )}

                    {/* Rendering state */}
                    {status === "rendering" && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-t-purple-400 animate-spin"></div>
                            </div>
                            <p className="text-white font-semibold text-lg">Rendering…</p>
                        </div>
                    )}

                    {/* Error state */}
                    {status === "error" && (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                                <X className="w-8 h-8 text-red-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold text-lg">Something went wrong</p>
                                <p className="text-red-300 text-sm mt-1">{errorMsg}</p>
                            </div>
                            <button
                                onClick={handleRetry}
                                className="mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Diagram */}
                    <div
                        ref={containerRef}
                        className={`bg-white rounded-2xl p-6 shadow-inner flex items-center justify-center transition-all ${status === "done" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                            }`}
                        style={{ minHeight: status === "done" ? "400px" : undefined }}
                    />

                    {/* Mermaid raw code (collapsible) */}
                    {status === "done" && diagramCode && (
                        <details className="mt-4">
                            <summary className="text-indigo-300 text-xs cursor-pointer hover:text-indigo-200 transition-colors select-none">
                                View Mermaid code
                            </summary>
                            <pre className="mt-2 p-4 bg-black/30 rounded-xl text-indigo-200 text-xs overflow-x-auto font-mono leading-relaxed">
                                {diagramCode}
                            </pre>
                        </details>
                    )}
                </div>

                {/* Footer — selected text preview */}
                <div className="px-6 py-3 border-t border-indigo-500/20">
                    <p className="text-indigo-400 text-xs line-clamp-1">
                        <span className="font-semibold text-indigo-300">Source: </span>
                        {selectedText?.slice(0, 120)}{selectedText?.length > 120 ? "…" : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}
