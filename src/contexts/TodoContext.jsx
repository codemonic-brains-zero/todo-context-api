import React, { createContext, useContext, useState, useEffect } from "react";

// Create the TodoContext
export const TodoContext = createContext();

// Custom hook to use the TodoContext
export const useTodo = () => {
    return useContext(TodoContext);
};

// TodoProvider component to manage state and logic
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Load todos from localStorage on mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos);
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Function to add a new todo
    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
        // setTodos(todo)
    };

    // Function to update an existing todo
    const updateTodo = (id, updatedTodo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...updatedTodo } : prevTodo))
        );
    };

    // Function to delete a todo by ID
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Function to toggle the completion status of a todo by ID
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
            )
        );
    };

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
        >
            {children}
        </TodoContext.Provider>
    );
};
