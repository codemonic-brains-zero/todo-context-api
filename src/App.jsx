import React from 'react';
import { TodoProvider, useTodo } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

// Component that uses the useTodo hook to render the list of todos
const TodoList = () => {
  const { todos } = useTodo(); // This will work because TodoList is a child of TodoProvider

  return (
    <div className="w-full"> {/* Ensure TodoList is full width */}
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} className='w-full' />
      ))}
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="w-full"> {/* Ensure this wrapper is full width */}
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
