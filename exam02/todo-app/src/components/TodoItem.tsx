import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <div
            className={`group flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''
                }`}
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${todo.completed
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                    aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
                >
                    {todo.completed && (
                        <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </button>
                <span
                    className={`text-lg truncate transition-all duration-200 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                        }`}
                >
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-gray-400 hover:text-red-500"
                aria-label="Delete todo"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>
    );
}
