import {TodoProvider} from './contexts'
import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItems'

                 // todo app using context api and local storage  //
function App() {
const [todos ,setTodos] = useState([])
// addTodo
const addTodo = (todo) =>{
  setTodos((prev)=>[{id:Date.now(),...todo},...prev ])
}
// updateTodo 
const updateTodo = (todo,id) =>{
setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
}

// deleteTodo 
const deleteTodo = (id) =>{
setTodos((prev)=>prev.filter((todo)=>todo.id !== id))
}

// toggle button just for checked or unchecked
const toggleComplete = (id) =>{
setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id ? 
{...prevTodo , completed : !prevTodo.completed} : prevTodo))
}

// yeah useEffect localStorage say data get kary ga load honay per 
useEffect(()=>{
  const todoss = JSON.parse(localStorage.getItem('todos'));
  if(todoss && todoss.length > 0){
    setTodos(todoss);
  }
},[])

// yeah useEffect data set karay ga localStorage main 
useEffect(()=>{
localStorage.setItem('todos', JSON.stringify(todos));
},[todos])


  return (
  
    <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
   <div className="bg-[#172842] min-h-screen py-8 ">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todos in React</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo)=>(
                            <div key={todo.id} className='w-full'>
                            <TodoItem   todo={todo}/>
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
