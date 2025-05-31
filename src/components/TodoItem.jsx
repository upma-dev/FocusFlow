import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
const [isTodoEditable, setIsTodoEditable] = useState(false)
const [todoMsg, setTodoMsg]= useState(todo.todo) 
const {updateTodo, deleteTodo, toggleComplete} = useTodo()
    

const editTodo = () => {
  updateTodo(todo.id, {...todo, todo: todoMsg})
  setIsTodoEditable(false)
}
const toggleCompleted =() => {
  toggleComplete(todo.id)
}

  return (
      <div
          className={`group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 ${
              todo.completed 
                  ? "bg-slate-800/50 border-slate-700/50" 
                  : "hover:bg-slate-800/50 hover:border-white/20"
          }`}
      >
          <div className="flex items-center gap-4 flex-1 min-w-0">
              <input
                  type="checkbox"
                  className="w-5 h-5 rounded-md border-2 border-white/30 checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-blue-500/30"
                  checked={todo.completed}
                  onChange={toggleCompleted}
              />
              <div className="flex-1 min-w-0">
                  <input
                      type="text"
                      className={`w-full bg-transparent text-white placeholder-white/50 outline-none transition-all duration-200 ${
                          isTodoEditable 
                              ? "border-b-2 border-blue-500 px-2 py-1 bg-slate-700/50 rounded" 
                              : "border-transparent"
                      } ${todo.completed ? "line-through text-white/40" : ""}`}
                      value={todoMsg}
                      onChange={(e) => setTodoMsg(e.target.value)}
                      readOnly={!isTodoEditable}
                  />
                  <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                      <button className="hover:text-white/60 transition-colors flex items-center gap-1">
                          <span>📅</span> Add date
                      </button>
                      <button className="hover:text-white/60 transition-colors flex items-center gap-1">
                          <span>⭐</span> Priority
                      </button>
                      <button className="hover:text-white/60 transition-colors flex items-center gap-1">
                          <span>🏷️</span> Add label
                      </button>
                  </div>
              </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button
                  className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                      todo.completed 
                          ? "text-white/30 cursor-not-allowed" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => {
                      if (todo.completed) return;
                      if (isTodoEditable) {
                          editTodo();
                      } else setIsTodoEditable((prev) => !prev);
                  }}
                  disabled={todo.completed}
                  title={isTodoEditable ? "Save changes" : "Edit task"}
              >
                  {isTodoEditable ? "💾" : "✏️"}
              </button>
              <button
                  className="p-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete task"
              >
                  🗑️
              </button>
          </div>
      </div>
  );
}

export default TodoItem;


