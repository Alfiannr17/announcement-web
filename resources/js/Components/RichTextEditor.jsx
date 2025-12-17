import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export default function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Tulis isi pengumuman di sini...',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
    }, [value]);

    if (!editor) return null;

    return (
        <div className="border rounded-md">

            <div className="flex items-center space-x-2 border-b p-2 bg-gray-50">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive('bold')
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                >
                    <b>B</b>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive('italic')
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                >
                    <i>I</i>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive('bulletList')
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive('orderedList')
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive('heading', { level: 2 })
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                >
                    H2
                </button>
            </div>

            <EditorContent editor={editor} className="p-3 text-sm min-h-[150px]" />
        </div>
    );
}
