import { Link } from "react-router-dom"

export default function TodoList({todos, updateCallback}) {

    async function onDelete(task_id){
        try{
            const url = `http://127.0.01:5000/delete_todo/${task_id}`
            const option = {
                method: "DELETE"
            }

            const response = await fetch(url, option)

            if(response.status === 200){
                const data = await response.json()
                updateCallback(data.message)
            }else{
                console.error("Failed to delete")
            }

        }catch(err){
            alert(err)
        }
    }

    return (
        <>
        {todos.map((todo)=>(
            <div className="card w-75 mb-3" key={todo.id}>
                <div className="card-body">
                    <h5 className="card-title">{todo.task}</h5>
                    <Link to={`/todo/detail/${todo.id}`}>
                        <button className="btn btn-primary">Detail</button>
                    </Link>
                    <button onClick={()=>onDelete(todo.id)} className="btn btn-danger mx-4">Delete</button>
                </div>
            </div>
        ))}
        </>
        
        
    );
}
