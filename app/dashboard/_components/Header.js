"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePrivacy } from "@/components/SolanaProvider";
import { Shield, ShieldCheck, Loader2, Sparkles } from "lucide-react";

function Header() {
  const { user } = useUser();
  const { connected } = useWallet();
  const { isPrivacyActive, activatePrivacy, isActivating } = usePrivacy();

  const handleActivatePrivacy = async () => {
    try {
      await activatePrivacy();
    } catch (err) {
      console.error("Privacy activation failed:", err);
    }
  };

  const displayName = user?.firstName || user?.fullName || "Scholar";

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left side: Greeting / Status */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">
          Welcome back, {displayName}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/60">
          <Sparkles className="w-3 h-3" />
          AI Active
        </span>
      </div>

      {/* Right side: Security & Profile */}
      <div className="flex items-center gap-3">
        {/* Privacy Status Badge */}
        {isPrivacyActive ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Zero-Knowledge Active</span>
            <span className="sm:hidden">E2EE</span>
          </div>
        ) : connected ? (
          <button
            onClick={handleActivatePrivacy}
            disabled={isActivating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60 rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            {isActivating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Shield className="w-3.5 h-3.5" />
            )}
            <span>{isActivating ? "Deriving Key..." : "Activate Privacy"}</span>
          </button>
        ) : (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-500 border border-gray-200/60 rounded-full text-xs">
            <Shield className="w-3.5 h-3.5 text-gray-400" />
            <span>Connect Solana for E2EE</span>
          </div>
        )}

        {/* Solana Wallet Connect Button */}
        <div className="[&_.wallet-adapter-button]:!h-9 [&_.wallet-adapter-button]:!text-xs [&_.wallet-adapter-button]:!rounded-xl [&_.wallet-adapter-button]:!px-3.5 [&_.wallet-adapter-button]:!bg-slate-900 hover:[&_.wallet-adapter-button]:!bg-slate-800">
          <WalletMultiButton />
        </div>

        {/* Clerk User Button */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 ring-2 ring-indigo-500/20",
            },
          }}
        />
      </div>
    </header>
  );
}

export default Header;