import { useState, useEffect } from "react";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";
import TodoItem from "./components/TodoItem";
import  TodoForm  from "./components/TodoForm";


function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo,completed: !prevTodo.completed }
          : prevTodo))
    
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete}}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-white tracking-tight">
              ✨ Todo List
            </h1>
            <p className="text-center text-white/80 mb-8 text-lg">
              Organize your tasks efficiently
            </p>
            <div className="mb-8">
              <TodoForm />
            </div>
            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full transform transition-all duration-300 hover:scale-[1.02]">
                  <TodoItem todo={todo} />
                </div>
              ))}
              {todos.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  <p className="text-lg">No todos yet! Add one above 👆</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
