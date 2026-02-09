import { useState } from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-gray-500 font-medium">{activeCount} tasks remaining</span>
                <div className="flex gap-1 bg-gray-100/50 p-1 rounded-xl">
                    {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${filter === f
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-1">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                            {filter === 'completed'
                                ? "No completed tasks yet"
                                : filter === 'active'
                                    ? "No active tasks!"
                                    : "No tasks found"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
