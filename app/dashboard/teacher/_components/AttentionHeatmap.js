"use client";
import React from "react";
import { Grid3X3 } from "lucide-react";

export default function AttentionHeatmap() {
    // Demo heatmap data: rows = time blocks, cols = content sections
    const rows = ["Intro", "Core", "Exercises", "Summary"];
    const cols = ["9:00", "9:15", "9:30", "9:45", "10:00", "10:15"];
    const heatData = [
        [90, 85, 70, 65, 80, 75],
        [60, 75, 85, 90, 88, 82],
        [40, 50, 60, 70, 65, 55],
        [80, 78, 72, 68, 75, 82],
    ];

    const getHeatColor = (value) => {
        if (value >= 80) return "bg-emerald-500/80";
        if (value >= 60) return "bg-emerald-400/50";
        if (value >= 40) return "bg-amber-400/50";
        return "bg-red-400/50";
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Grid3X3 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">Attention Heatmap</h2>
                    <p className="text-xs text-gray-500">Focus by content × time</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-xs text-gray-400 font-medium text-left pb-2 pr-3"></th>
                            {cols.map((col, i) => (
                                <th key={i} className="text-xs text-gray-400 font-medium pb-2 px-1 text-center">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri}>
                                <td className="text-xs text-gray-600 font-semibold pr-3 py-1">{row}</td>
                                {heatData[ri].map((val, ci) => (
                                    <td key={ci} className="p-1">
                                        <div
                                            className={`${getHeatColor(val)} rounded-lg h-8 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-default group relative`}
                                        >
                                            <span className="text-[10px] font-bold text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 justify-center">
                {[
                    { color: "bg-red-400/50", label: "<40%" },
                    { color: "bg-amber-400/50", label: "40-60%" },
                    { color: "bg-emerald-400/50", label: "60-80%" },
                    { color: "bg-emerald-500/80", label: "80%+" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="text-[10px] text-gray-500 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
