import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import * as uuid from 'uuid';

const LOCALSTORAGE = 'todApp.todos'

function Page() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCALSTORAGE))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [... todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAdd(e) {
    const name = todoNameRef.current.value
    if(name == '') return
    console.log(name)
    setTodos(prevTodos => {
      return [... prevTodos, { id: uuid.v4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function handleClear(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo ={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAdd}>Add Todo</button>
      <button onClick={handleClear}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} tasks remaining</div>

    </>
  )
}

export default Page;
