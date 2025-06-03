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
      <div className="min-h-screen relative overflow-hidden">
        {/* Dynamic Background with Multiple Layers */}
        <div className="fixed inset-0">
          {/* Base background with gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `,
              backgroundSize: '200% 200%',
              animation: 'gradientShift 15s ease infinite'
            }}
          />
          
          {/* Animated gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/50 to-slate-900/90"></div>
          
          {/* Animated particles with enhanced design */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating orbs */}
            <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" style={{ top: '-10%', left: '-10%', animationDelay: '0s' }}></div>
            <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" style={{ top: '40%', right: '-10%', animationDelay: '2s' }}></div>
            <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow" style={{ bottom: '-10%', left: '30%', animationDelay: '4s' }}></div>
            
            {/* Animated particles */}
            <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
            <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ top: '30%', left: '50%', animationDelay: '1s' }}></div>
            <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float" style={{ top: '50%', left: '80%', animationDelay: '2s' }}></div>
            <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ top: '70%', left: '30%', animationDelay: '3s' }}></div>
            <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float" style={{ top: '20%', left: '70%', animationDelay: '4s' }}></div>
            
            {/* Additional particles */}
            <div className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float-slow" style={{ top: '15%', left: '40%', animationDelay: '0.5s' }}></div>
            <div className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-float-slow" style={{ top: '60%', left: '20%', animationDelay: '1.5s' }}></div>
            <div className="absolute w-2 h-2 bg-indigo-400/20 rounded-full animate-float-slow" style={{ top: '25%', left: '85%', animationDelay: '2.5s' }}></div>
          </div>
        </div>

        {/* Animated Quote Section with Enhanced Design */}
        <div className="relative pt-8 pb-6 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
                TaskFlow
              </h1>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-light text-white/90 mb-2">
                  "The key to productivity is not working harder, but working smarter."
                </h2>
                <p className="text-white/60 text-sm">
                  — Let's make your day more organized and efficient
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Enhanced Layout */}
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with Glass Effect */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-4 bg-slate-800/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 flex items-center gap-2">
                    <span className="text-blue-400">✨</span> Dashboard
                  </h2>
                  <p className="text-sm text-white/60">Track your progress and manage tasks</p>
                </div>
                
                <nav className="space-y-1.5">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Show all tasks')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  >
                    <span>📋</span> All Tasks
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Show important tasks')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                  >
                    <span>⭐</span> Important
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Show today\'s tasks')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                  >
                    <span>📅</span> Today
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Show upcoming tasks')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                  >
                    <span>📊</span> Upcoming
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area with Enhanced Design */}
            <div className="flex-1 min-w-0">
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 sm:p-6 shadow-xl">
                {/* Header with Gradient Text */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
                      <span className="text-blue-400">📝</span> My Tasks
                    </h1>
                    <p className="text-white/60 mt-0.5">Manage your tasks efficiently</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Search tasks')
                      }}
                      className="px-3 py-2 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                    >
                      <span>🔍</span> Search
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        document.querySelector('input[placeholder="Add a new task..."]')?.focus()
                      }}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                    >
                      <span>➕</span> New Task
                    </button>
                  </div>
                </div>

                {/* Task Form with Enhanced Design */}
                <div className="mb-6">
                  <TodoForm />
                </div>

                {/* Task List with Enhanced Animations */}
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div key={todo.id} className="w-full transform transition-all duration-300 hover:scale-[1.01]">
                      <TodoItem todo={todo} />
                    </div>
                  ))}
                  {todos.length === 0 && (
                    <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-white/5">
                      <div className="text-5xl mb-3 animate-bounce">✨</div>
                      <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">No tasks yet!</p>
                      <p className="text-white/40 mt-1">Add your first task to get started</p>
                    </div>
                  )}
                </div>

                {/* Stats with Enhanced Design */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-sm text-white/40">Total Tasks</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-0.5">{todos.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/5 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-sm text-white/40">Completed</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mt-0.5">{todos.filter(t => t.completed).length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-white/5 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-sm text-white/40">Pending</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mt-0.5">{todos.filter(t => !t.completed).length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-white/5 hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-sm text-white/40">Completion Rate</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mt-0.5">
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
