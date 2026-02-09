import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

const STORAGE_KEY = 'todo-app-data';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
            try {
                setTodos(JSON.parse(savedTodos));
            } catch (error) {
                console.error('Failed to parse todos from local storage', error);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = (title: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: Date.now(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        isLoaded,
    };
}
