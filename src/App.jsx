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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Sidebar */}
          <div className="fixed left-4 top-4 bottom-4 w-64 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hidden lg:block">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">TaskFlow</h2>
              <p className="text-sm text-white/60">Organize your day with clarity</p>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span>📋</span> All Tasks
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                <span>⭐</span> Important
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                <span>📅</span> Today
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                <span>📊</span> Upcoming
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/40 mb-3">PROJECTS</h3>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                <span>➕</span> Add Project
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:ml-72">
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">All Tasks</h1>
                  <p className="text-white/60 mt-1">Manage your tasks efficiently</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <span>🔍</span> Search
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <span>➕</span> New Task
                  </button>
                </div>
              </div>

              {/* Task Form */}
              <div className="mb-8">
                <TodoForm />
              </div>

              {/* Task List */}
              <div className="space-y-4">
                {todos.map((todo) => (
                  <div key={todo.id} className="w-full transform transition-all duration-300 hover:scale-[1.01]">
                    <TodoItem todo={todo} />
                  </div>
                ))}
                {todos.length === 0 && (
                  <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-white/5">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-xl text-white/80">No tasks yet!</p>
                    <p className="text-white/40 mt-2">Add your first task to get started</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <p className="text-sm text-white/40">Total Tasks</p>
                    <p className="text-2xl font-bold text-white mt-1">{todos.length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <p className="text-sm text-white/40">Completed</p>
                    <p className="text-2xl font-bold text-white mt-1">{todos.filter(t => t.completed).length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <p className="text-sm text-white/40">Pending</p>
                    <p className="text-2xl font-bold text-white mt-1">{todos.filter(t => !t.completed).length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                    <p className="text-sm text-white/40">Completion Rate</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {todos.length ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
