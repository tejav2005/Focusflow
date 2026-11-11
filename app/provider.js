"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import SolanaProvider from '@/components/SolanaProvider';


function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <ConvexProvider client={convex}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          <SolanaProvider>
            {children}
          </SolanaProvider>
        </PayPalScriptProvider>
      </ConvexProvider>;

    </div>
  )
}

export default Provider
