import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
    
    const add = (e) => {
        e.preventDefault()

        if(!todo) return

        addTodo({todo, completed: false})
        setTodo("")
    }

    return (
        <form onSubmit={add} className="relative group">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full px-6 py-4 pl-12 text-lg rounded-xl bg-slate-800/50 border-2 border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📝</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button 
                    type="button"
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    title="Add due date"
                >
                    📅
                </button>
                <button 
                    type="button"
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    title="Set priority"
                >
                    ⭐
                </button>
                <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!todo.trim()}
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default TodoForm;


