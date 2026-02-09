import { useState, KeyboardEvent } from 'react';

interface AddTodoProps {
    onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return; // Prevent double firing with IME
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="mb-8">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="w-full p-4 pl-6 pr-14 text-lg bg-white rounded-2xl shadow-sm border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className="absolute right-2 p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95"
                    aria-label="Add todo"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
