"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

export default function EngagementDistribution() {
    const segments = [
        { label: "Highly Focused", value: 42, color: "from-emerald-400 to-teal-500" },
        { label: "Moderately Focused", value: 35, color: "from-amber-400 to-orange-500" },
        { label: "Distracted", value: 15, color: "from-red-400 to-rose-500" },
        { label: "Idle", value: 8, color: "from-gray-400 to-slate-500" },
    ];

    const maxValue = Math.max(...segments.map(s => s.value));

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">Engagement Distribution</h2>
                    <p className="text-xs text-gray-500">Student attention breakdown</p>
                </div>
            </div>

            <div className="space-y-4">
                {segments.map((seg, i) => (
                    <div key={i} className="group">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-gray-600">{seg.label}</span>
                            <span className="text-sm font-black text-gray-800">{seg.value}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${seg.color} rounded-full transition-all duration-700 group-hover:shadow-lg`}
                                style={{ width: `${(seg.value / maxValue) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary ring */}
            <div className="mt-6 flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">77%</p>
                    <p className="text-[10px] text-gray-500 font-medium">Avg Focus</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                    <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">24</p>
                    <p className="text-[10px] text-gray-500 font-medium">Students</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                    <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">45m</p>
                    <p className="text-[10px] text-gray-500 font-medium">Duration</p>
                </div>
            </div>
        </div>
    );
}
