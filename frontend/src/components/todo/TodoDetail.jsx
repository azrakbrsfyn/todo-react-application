import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoFormEdit from "./TodoFormEdit";

export default function TodoDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTodoById();
    }, [id]);

    async function fetchTodoById() {
        const response = await fetch(`http://127.0.0.1:5000/todo/${id}`);
        const data = await response.json();
        setTask(data.todo);
    }

    function onUpdate(message) {
        fetchTodoById();
        setMessage(message);
        console.log(message);
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }

    if (!task) {
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <div className="container my-4">
        <h1>Task Detail</h1>
        <Link to={`/todo`}>
            <button className="btn btn-primary my-4">Back</button>
        </Link>
        {message && <div className="alert alert-success">{message}</div>}
        <div className="card">
            <div className="card-header">
            <h4>
                {task.task}{" "}
                <span className="mx-4">
                <TodoFormEdit existingTask={task} updateCallback={onUpdate} />
                </span>
            </h4>
            </div>
            <div className="card-body">
            <p className="card-text">{task.detail}</p>
            </div>
        </div>
        </div>
    );
    }
