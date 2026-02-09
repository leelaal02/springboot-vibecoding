"use client";

import { useTodos } from "@/hooks/useTodos";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";

export default function Home() {
    const { todos, addTodo, toggleTodo, deleteTodo, isLoaded } = useTodos();

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-0">
            <div className="w-full max-w-2xl">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Tasks
                    </h1>
                    <p className="text-gray-500">
                        Stay organized and get things done.
                    </p>
                </header>

                <section className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 sm:p-10 border border-gray-100">
                    <AddTodo onAdd={addTodo} />
                    <TodoList
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                </section>

                <footer className="mt-12 text-center text-gray-400 text-sm">
                    <p>Press <kbd className="font-sans px-2 py-0.5 bg-gray-200 rounded text-gray-500">Enter</kbd> to add a task</p>
                </footer>
            </div>
        </main>
    );
}
