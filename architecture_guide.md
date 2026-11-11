# AI PDF Notes - Architectural Guide

This document provides a detailed overview of the application's design, technology stack, and its unique approach to data privacy.

## 1. High-Level Architecture
The application follows a modern serverless architecture:
- **Frontend**: Next.js 15 (App Router) hosted on Vercel.
- **Backend-as-a-Service (BaaS)**: [Convex](https://www.convex.dev/) manages the database, serverless functions, and file storage.
- **Authentication**: [Clerk](https://clerk.com/) handles user identity and session management.
- **AI Layer**: [Google Gemini](https://ai.google.dev/) provides generative text and vector embedding capabilities.

## 2. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 / React 19 | Responsive UI, Routing, and Client Logic |
| **Styling** | Tailwind CSS / Lucide React | Modern, utility-first UI design |
| **Database** | Convex | Real-time database and Vector Search |
| **Auth** | Clerk | Secure login and user management |
| **AI (LLM)** | Gemini 2.5 Flash | AI-powered notes generation and chat |
| **AI (Embeddings)**| Gemini Embedding-001 | Converting PDF text to searchable vectors |
| **Privacy** | Solana Web3 / Web Crypto | E2E Encryption using wallet signatures |
| **Editor** | Tiptap | Rich text editing for AI-assisted notes |
| **PDF Handling** | PDF.js (Browser-side) | Parsing PDF content entirely on the user's device |

## 3. Privacy & Security Model (E2EE)
The application implements **End-to-End Encryption (E2EE)** using a decentralized approach.

### The Privacy Flow:
1. **Key Derivation**: When a user connects their **Solana Wallet**, they sign a static message. This signature is passed through **Argon2id** (a memory-hard hashing function) to create a deterministic, fixed-length **256-bit AES key**. 
   - *Crucially, this key is only known to the user's browser.*
2. **Client-Side Processing**: PDFs are parsed *locally* in the browser using `pdfjs-dist`. The raw text never leaves the device in plaintext if privacy is enabled.
3. **Encryption**: Before being sent to the database (Convex), text chunks and user notes are encrypted using **AES-256-GCM**.
4. **Hybrid Search**: To allow similarity search while maintaining privacy, text chunks are sent to Gemini for embeddings (temporary plaintext processing), but stored in Convex alongside their **encrypted** text content.
5. **Browser-Side Decryption**: When a search result or note is retrieved, the browser uses the derived AES key to decrypt the content on-the-fly.

## 4. Key Workflows

### A. PDF Upload & Ingestion
1. Raw PDF is uploaded to Convex Storage.
2. Browser-side parsing extracts text locally.
3. Text is split into overlapping chunks and optionally encrypted.
4. `ingest` action generates vector embeddings for retrieval.

### B. AI-Assisted Note Creation
1. User selects text in the viewer.
2. `onAiClick` sends the selection + context to Gemini.
3. Gemini generates a structured response inserted into the Tiptap editor.
4. Notes are saved to Convex (encrypted if privacy is enabled).

## 5. Security Summary
- **No Plaintext Storage**: Notes and document text are stored as encrypted blobs if privacy is active.
- **Decentralized Trust**: Encryption keys depend on the user's Solana wallet signature, meaning developers cannot read user data.
- **Local Parsing**: Reduces the risk of data leaks by keeping raw PDF content on the device.
