import React from 'react'
import App from './App'

export default function ToDo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}
