"use client";
import React from "react";
import { ShieldCheck, Eye, Database, Clock, Trash2 } from "lucide-react";

export default function PrivacyPanel() {
    const privacyItems = [
        { icon: Eye, label: "No identities tracked", description: "Anonymous session data only", color: "text-emerald-600 bg-emerald-100" },
        { icon: Database, label: "Aggregated attention data", description: "No individual profiling", color: "text-blue-600 bg-blue-100" },
        { icon: Clock, label: "Session-based storage", description: "Temporary data retention", color: "text-purple-600 bg-purple-100" },
        { icon: Trash2, label: "Auto-deletion after session", description: "Data purged on session end", color: "text-amber-600 bg-amber-100" },
    ];

    return (
        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-emerald-200/50 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-emerald-800 text-lg">Privacy Status</h2>
                    <p className="text-xs text-emerald-600">All privacy protections active</p>
                </div>
                <div className="ml-auto px-3 py-1 bg-emerald-200/60 text-emerald-700 rounded-full text-xs font-bold">
                    ✓ Compliant
                </div>
            </div>

            <div className="space-y-3">
                {privacyItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="flex items-center gap-3 bg-white/60 rounded-2xl p-3 transition-all duration-300 hover:bg-white/80 hover:scale-[1.01]">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
