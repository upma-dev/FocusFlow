import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
    
    const add = (e) => {
        e.preventDefault()
        e.stopPropagation() // Prevent event bubbling

        if(!todo.trim()) return

        addTodo({
            id: Date.now(),
            todo: todo.trim(),
            completed: false
        })
        setTodo("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            add(e)
        }
    }

    return (
        <form onSubmit={add} className="relative group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full px-6 py-4 pl-12 text-lg rounded-xl bg-slate-800/50 border-2 border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transform group-hover:scale-110 transition-transform duration-300">📝</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Add date functionality will be implemented later
                        console.log('Add date clicked')
                    }}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-110"
                    title="Add due date"
                >
                    📅
                </button>
                <button 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Add priority functionality will be implemented later
                        console.log('Add priority clicked')
                    }}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 transform hover:scale-110"
                    title="Set priority"
                >
                    ⭐
                </button>
                <button 
                    type="submit" 
                    onClick={(e) => {
                        e.stopPropagation()
                        add(e)
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                    disabled={!todo.trim()}
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default TodoForm;


