"use client";
import React from "react";
import { Activity, Wifi } from "lucide-react";

export default function LiveFocusMeter({ focusScore = 72 }) {
    const getColor = (score) => {
        if (score >= 70) return { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600", bg: "bg-emerald-50", label: "Excellent" };
        if (score >= 40) return { gradient: "from-amber-500 to-orange-500", text: "text-amber-600", bg: "bg-amber-50", label: "Moderate" };
        return { gradient: "from-red-500 to-rose-500", text: "text-red-600", bg: "bg-red-50", label: "Low" };
    };

    const colors = getColor(focusScore);
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (focusScore / 100) * circumference;

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-lg">Live Focus</h2>
                        <p className="text-xs text-gray-500">Real-time monitoring</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <Wifi className="w-3 h-3" />
                    Live
                </div>
            </div>

            <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="45" fill="none"
                            stroke="url(#focusGradient)" strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-black ${colors.text}`}>{focusScore}%</span>
                        <span className={`text-xs font-semibold ${colors.text} mt-0.5`}>{colors.label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
