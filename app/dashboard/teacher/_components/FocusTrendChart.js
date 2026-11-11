"use client";
import React from "react";
import { TrendingUp } from "lucide-react";

export default function FocusTrendChart({ data = [] }) {
    // Demo data when no real data
    const chartData = data.length > 0 ? data : [
        { time: "9:00", score: 85 },
        { time: "9:15", score: 78 },
        { time: "9:30", score: 65 },
        { time: "9:45", score: 72 },
        { time: "10:00", score: 80 },
        { time: "10:15", score: 68 },
        { time: "10:30", score: 75 },
        { time: "10:45", score: 82 },
    ];

    const maxScore = Math.max(...chartData.map(d => d.score));
    const minScore = Math.min(...chartData.map(d => d.score));

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">Focus Trend</h2>
                    <p className="text-xs text-gray-500">Attention over time</p>
                </div>
            </div>

            <div className="relative h-40">
                <div className="flex items-end justify-between h-full gap-2 px-1">
                    {chartData.map((item, i) => {
                        const height = ((item.score - minScore + 10) / (maxScore - minScore + 20)) * 100;
                        const getBarColor = (score) => {
                            if (score >= 75) return "from-emerald-400 to-teal-500";
                            if (score >= 50) return "from-amber-400 to-orange-500";
                            return "from-red-400 to-rose-500";
                        };
                        return (
                            <div key={i} className="flex flex-col items-center flex-1 group">
                                <div className="relative w-full flex justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap transition-opacity font-semibold">
                                        {item.score}%
                                    </div>
                                </div>
                                <div
                                    className={`w-full max-w-[32px] bg-gradient-to-t ${getBarColor(item.score)} rounded-t-xl transition-all duration-500 hover:scale-105 shadow-sm`}
                                    style={{ height: `${height}%`, minHeight: "12px" }}
                                />
                                <span className="text-[10px] text-gray-400 mt-2 font-medium">{item.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
