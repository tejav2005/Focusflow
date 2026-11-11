import { argon2id } from "hash-wasm";

/**
 * End-to-End Encryption Engine — AES-256-GCM
 *
 * The encryption key is derived from a Solana wallet signature using Argon2id.
 * Argon2id is a memory-hard hashing function that resists GPU/ASIC brute-force attacks.
 */

// The static message the wallet signs to generate the encryption key.
// Changing this message will invalidate all previously encrypted data.
export const SIGN_MESSAGE = "Authorize AI PDF Notes Privacy Key v1";

/**
 * Derive a 256-bit AES key from a Solana wallet signature.
 * Uses Argon2id for high-security key derivation.
 */
export async function deriveKeyFromSignature(signatureBytes) {
    // We use a deterministic salt based on the SIGN_MESSAGE.
    const salt = new TextEncoder().encode(SIGN_MESSAGE.padEnd(16, "salt")).slice(0, 16);

    const hashBytes = await argon2id({
        password: signatureBytes,
        salt: salt,
        iterations: 3,
        memorySize: 65536, // 64MB
        parallelism: 4,
        hashLength: 32, // 256 bits
        outputType: "binary",
    });

    return crypto.subtle.importKey("raw", hashBytes, { name: "AES-GCM" }, false, [
        "encrypt",
        "decrypt",
    ]);
}

/**
 * Encrypt a plaintext string with AES-256-GCM.
 * Returns a base64 string: iv(12 bytes) + ciphertext.
 */
export async function encrypt(plaintext, aesKey) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        encoded
    );
    // Combine iv + ciphertext into one buffer
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);
    return bufferToBase64(combined);
}

/**
 * Decrypt a base64 string produced by `encrypt()`.
 * Returns the original plaintext string.
 */
export async function decrypt(base64Str, aesKey) {
    const combined = base64ToBuffer(base64Str);
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        aesKey,
        ciphertext
    );
    return new TextDecoder().decode(decrypted);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function bufferToBase64(buffer) {
    let binary = "";
    for (const byte of buffer) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
}

function base64ToBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}
