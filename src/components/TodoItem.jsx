import React, { useState, useEffect } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo) 
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()
    
    // Update local state when todo prop changes
    useEffect(() => {
        setTodoMsg(todo.todo)
    }, [todo.todo])
    
    const editTodo = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (todoMsg.trim()) {
            updateTodo(todo.id, {...todo, todo: todoMsg.trim()})
            setIsTodoEditable(false)
        }
    }
    
    const toggleCompleted = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleComplete(todo.id)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && isTodoEditable) {
            editTodo(e)
        } else if (e.key === 'Escape') {
            setIsTodoEditable(false)
            setTodoMsg(todo.todo)
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTodo(todo.id)
        }
    }

    return (
        <div
            className={`group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 ${
                todo.completed 
                    ? "bg-slate-800/50 border-slate-700/50" 
                    : "hover:bg-slate-800/50 hover:border-white/20"
            } relative overflow-hidden`}
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center gap-4 flex-1 min-w-0 relative">
                <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-2 border-white/30 checked:bg-gradient-to-r checked:from-blue-500 checked:to-purple-500 checked:border-transparent cursor-pointer transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 transform hover:scale-110"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        className={`w-full bg-transparent text-white placeholder-white/50 outline-none transition-all duration-300 ${
                            isTodoEditable 
                                ? "border-b-2 border-blue-500 px-2 py-1 bg-slate-700/50 rounded" 
                                : "border-transparent"
                        } ${todo.completed ? "line-through text-white/40" : ""}`}
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        onKeyDown={handleKeyPress}
                        readOnly={!isTodoEditable}
                    />
                    <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Add date functionality will be implemented later
                                console.log('Add date clicked for task:', todo.id)
                            }}
                            className="hover:text-white/60 transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                        >
                            <span>📅</span> Add date
                        </button>
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Add priority functionality will be implemented later
                                console.log('Add priority clicked for task:', todo.id)
                            }}
                            className="hover:text-white/60 transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                        >
                            <span>⭐</span> Priority
                        </button>
                        <button 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Add label functionality will be implemented later
                                console.log('Add label clicked for task:', todo.id)
                            }}
                            className="hover:text-white/60 transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                        >
                            <span>🏷️</span> Add label
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                    className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                        todo.completed 
                            ? "text-white/30 cursor-not-allowed" 
                            : "text-white/60 hover:text-white hover:bg-white/5 transform hover:scale-110"
                    }`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo(e);
                        } else {
                            setIsTodoEditable(true);
                        }
                    }}
                    disabled={todo.completed}
                    title={isTodoEditable ? "Save changes" : "Edit task"}
                >
                    {isTodoEditable ? "💾" : "✏️"}
                </button>
                <button
                    className="p-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-red-500/20 transition-all duration-300 transform hover:scale-110"
                    onClick={handleDelete}
                    title="Delete task"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default TodoItem;


