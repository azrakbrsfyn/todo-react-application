import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function Todo(){
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState("")

    useEffect(()=>{
        fetchTodo()
    }, [])

    async function fetchTodo(){
        const url = "http://127.0.0.1:5000/todo";
        const response = await fetch(url)
        const data = await response.json()
        setTodos(data.todos)
    }

    function onUpdate(message){
        fetchTodo()
        setMessage(message)
        setTimeout(()=>setMessage(""), 3000)
    }



    return(
        <div className="container">
            {message && <div className="alert alert-success">{message}</div>}
            <h1>Todo</h1>
            <p>All your todo are in this page</p>
            <TodoForm updateCallback={onUpdate}/>
            <br />
            <br />
            <div className="d-flex justify-content-center">
                <div className="container-sm">
                    <TodoList todos={todos} updateCallback={onUpdate}/>
                </div>
            </div>
        </div>
    )
}