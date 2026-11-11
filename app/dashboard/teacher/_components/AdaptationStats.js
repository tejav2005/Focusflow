"use client";
import React from "react";
import { Sparkles, BookOpen, Headphones, ListChecks } from "lucide-react";

export default function AdaptationStats() {
    const stats = [
        { label: "Simplified", count: 12, icon: BookOpen, gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
        { label: "Bullet Mode", count: 8, icon: ListChecks, gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50" },
        { label: "Audio Mode", count: 5, icon: Headphones, gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50" },
    ];

    const total = stats.reduce((sum, s) => sum + s.count, 0);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">Adaptation Stats</h2>
                    <p className="text-xs text-gray-500">{total} total adaptations</p>
                </div>
            </div>

            <div className="space-y-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    const pct = Math.round((stat.count / total) * 100);
                    return (
                        <div key={i} className={`${stat.bg} rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
                                </div>
                                <span className="text-lg font-black text-gray-800">{stat.count}</span>
                            </div>
                            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
