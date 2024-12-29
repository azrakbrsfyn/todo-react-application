import { useEffect, useState } from "react"

export default function Home(){
    const [todos, setTodos] = useState([])
    const [count, setCount] = useState(0)

    useEffect(()=>{
        fetchTodos()
    }, [])

    async function fetchTodos() {
        const url = "http://127.0.0.1:5000/todo";
        const response = await fetch(url)
        const data = await response.json()
        setTodos(data.todos)
        setCount(data.todos.length)
    }

    return(
        <div className="container">
            <h1>Home</h1>
            <p>Total TODOS: {count}</p>
        </div>
    )
}