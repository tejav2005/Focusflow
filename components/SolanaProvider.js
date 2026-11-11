"use client";
import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback,
    useEffect,
} from "react";
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import {
    deriveKeyFromSignature,
    SIGN_MESSAGE,
} from "@/lib/encryption";

// Import wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

// ── Privacy Context ──────────────────────────────────────────────────────────
// Exposes the AES key derived from the wallet signature.
const PrivacyContext = createContext({
    aesKey: null,
    isPrivacyActive: false,
    activatePrivacy: async () => { },
    deactivatePrivacy: () => { },
    isActivating: false,
});

export const usePrivacy = () => useContext(PrivacyContext);

// ── Inner provider (needs useWallet) ─────────────────────────────────────────
function PrivacyProvider({ children }) {
    const { publicKey, signMessage, connected } = useWallet();
    const [aesKey, setAesKey] = useState(null);
    const [isActivating, setIsActivating] = useState(false);

    // Deactivate when wallet disconnects
    useEffect(() => {
        if (!connected) {
            setAesKey(null);
        }
    }, [connected]);

    const activatePrivacy = useCallback(async () => {
        if (!publicKey || !signMessage) {
            throw new Error("Please connect your Solana wallet first.");
        }
        setIsActivating(true);
        try {
            const messageBytes = new TextEncoder().encode(SIGN_MESSAGE);
            const signature = await signMessage(messageBytes);
            const key = await deriveKeyFromSignature(signature);
            setAesKey(key);
        } finally {
            setIsActivating(false);
        }
    }, [publicKey, signMessage]);

    const deactivatePrivacy = useCallback(() => {
        setAesKey(null);
    }, []);

    const value = useMemo(
        () => ({
            aesKey,
            isPrivacyActive: aesKey !== null,
            activatePrivacy,
            deactivatePrivacy,
            isActivating,
        }),
        [aesKey, activatePrivacy, deactivatePrivacy, isActivating]
    );

    return (
        <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>
    );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function SolanaProvider({ children }) {
    const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <PrivacyProvider>{children}</PrivacyProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
