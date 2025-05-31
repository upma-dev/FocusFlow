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
        <form onSubmit={add} className="flex gap-2">
            <input
                type="text"
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!todo.trim()}
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;


