"use client"
import { Placeholder } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import EditiorExtension from './EditiorExtension'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { usePrivacy } from '@/components/SolanaProvider'
import { decrypt } from '@/lib/encryption'

function TextEditior({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, { fileId })
  const { aesKey, isPrivacyActive } = usePrivacy()
  const [decryptedNotes, setDecryptedNotes] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start Taking your notes here...' }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    immediatelyRender: false,
  })

  // Decrypt notes when they arrive from Convex
  useEffect(() => {
    if (notes === undefined || notes === null) {
      setDecryptedNotes(null)
      return
    }

    const tryDecrypt = async () => {
      if (isPrivacyActive && aesKey && typeof notes === 'string') {
        try {
          const plain = await decrypt(notes, aesKey)
          setDecryptedNotes(plain)
        } catch {
          // Decryption failed — notes may be in plaintext (pre-encryption)
          setDecryptedNotes(notes)
        }
      } else {
        setDecryptedNotes(notes)
      }
    }
    tryDecrypt()
  }, [notes, aesKey, isPrivacyActive])

  // Push decrypted notes into the editor
  useEffect(() => {
    if (editor && decryptedNotes) {
      editor.commands.setContent(decryptedNotes)
    }
  }, [decryptedNotes, editor])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Notes</h3>
        <EditiorExtension editor={editor} />
      </div>
      <div className="overflow-scroll h-[88vh] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg p-4 border border-indigo-100">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TextEditior



