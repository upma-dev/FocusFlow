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
          className={`group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
              todo.completed ? "bg-green-500/10 border-green-500/20" : "hover:bg-white/10"
          }`}
      >
          <input
              type="checkbox"
              className="w-5 h-5 rounded-md border-2 border-white/30 checked:bg-purple-500 checked:border-purple-500 cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`flex-1 bg-transparent text-white placeholder-white/50 outline-none transition-all duration-200 ${
                  isTodoEditable 
                      ? "border-b-2 border-purple-500 px-2 py-1" 
                      : "border-transparent"
              } ${todo.completed ? "line-through text-white/50" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                  className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                      todo.completed 
                          ? "text-white/30 cursor-not-allowed" 
                          : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                      if (todo.completed) return;
                      if (isTodoEditable) {
                          editTodo();
                      } else setIsTodoEditable((prev) => !prev);
                  }}
                  disabled={todo.completed}
              >
                  {isTodoEditable ? "💾" : "✏️"}
              </button>
              <button
                  className="p-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                  onClick={() => deleteTodo(todo.id)}
              >
                  🗑️
              </button>
          </div>
      </div>
  );
}

export default TodoItem;


