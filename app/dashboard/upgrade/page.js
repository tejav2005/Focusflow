"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Crown, Shield, Star, Check, Sparkles } from "lucide-react";

function UpgradePlans() {
  const userUpgradePlan = useMutation(api.user.userUpgradePlan);
  const { user } = useUser();

  const onPaymentSuccess = async () => {
    try {
      await userUpgradePlan({
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      toast.success("Plan upgraded successfully to Pro!");
    } catch (err) {
      toast.error(err.message || "Failed to upgrade plan");
    }
  };

  const [selectedPlan, setSelectedPlan] = useState("unlimited");

  return (
    <div className="space-y-12">
      {/* Premium Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Upgrade Your Workspace
          </h1>
        </div>
        <p className="text-base text-gray-500 font-medium max-w-xl mx-auto">
          Unlock unlimited document uploads, document deletion, and advanced AI-assisted note-taking capabilities.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div
          className={`relative rounded-3xl transition-all duration-300 p-8 border ${
            selectedPlan === "free"
              ? "bg-white shadow-xl border-indigo-200"
              : "bg-white/80 shadow-xs border-gray-200/60"
          }`}
          onClick={() => setSelectedPlan("free")}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full mb-3 text-xs font-semibold text-gray-600">
              <Shield className="w-3.5 h-3.5" />
              <span>STARTER</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Free Plan</h2>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-gray-900">$0</span>
              <span className="text-sm font-medium text-gray-500">/forever</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8 text-sm">
            {[
              "Up to 5 PDF Uploads",
              "Unlimited AI Note Taking",
              "Standard AI Vector Search",
              "Community Support",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            className="w-full py-3 px-6 bg-gray-100 text-gray-500 font-semibold rounded-xl text-sm border border-gray-200 cursor-not-allowed"
            disabled
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div
          className={`relative rounded-3xl transition-all duration-300 p-8 border ${
            selectedPlan === "unlimited"
              ? "bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 shadow-xl border-indigo-400"
              : "bg-white shadow-xs border-gray-200"
          }`}
          onClick={() => setSelectedPlan("unlimited")}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 px-3 py-1 rounded-full mb-3 text-xs font-bold text-indigo-700">
              <Crown className="w-3.5 h-3.5" />
              <span>PRO LIFETIME</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              Unlimited Plan
            </h2>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-indigo-600">$9.99</span>
              <span className="text-sm font-medium text-gray-500">/one-time</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8 text-sm">
            {[
              "Unlimited PDF Document Uploads",
              "Document Deletion & Storage Management",
              "Fastest Vector Embedding Generation",
              "Priority AI Q&A and Flash Summary",
              "Zero-Knowledge Solana Wallet Encryption",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-800 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs">
              <PayPalButtons
                onApprove={() => onPaymentSuccess()}
                onCancel={() => console.log("Payment Cancelled")}
                createOrder={(data, actions) => {
                  return actions?.order?.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "9.99",
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-8">
          Why Upgrade to FocusFlow Pro?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Unlimited Storage</h4>
            <p className="text-xs text-gray-500">Upload entire textbook libraries and lecture series without hitting limits.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Enhanced AI Context</h4>
            <p className="text-xs text-gray-500">Deeper semantic document search and faster Gemini 2.5 response times.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">One-Time Payment</h4>
            <p className="text-xs text-gray-500">Pay once and enjoy lifetime unlimited access without recurring monthly subscriptions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlans;
