import { useState } from "react";

export default function TodoForm({existingTask = {},updateCallback}) {
    const [task, setTask] = useState("")
    const [detail, setDetail] = useState("")

    function handleSetTask(e){
        setTask(e.target.value)
    }

    function handleSetDetail(e){
        setDetail(e.target.value)
    }

    async function onSubmit(e){
        e.preventDefault()

        const data = {
            task,
            detail
        }

        const url = "http://127.0.0.1:5000/create_todo";
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, option)

        if(response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }else{
            const data = await response.json()
            updateCallback(data.message);
            setTask("")
            setDetail("")
        }
    }

    return (
            <>
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#formNewTask"
                >
                    Add New Task
                </button>

                <form onSubmit={onSubmit}>
                    <div
                        className="modal fade"
                        id="formNewTask"
                        tabIndex="-1"
                        aria-labelledby="formNewTaskLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h1 className="modal-title fs-5" id="formNewTaskLabel">
                                Create New Task
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                            </div>
                            <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="task">Task Name</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            name="task" 
                                            id="task" 
                                            value={task}
                                            onChange={handleSetTask}
                                            placeholder="Entry new task..."

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="detail">Detail</label>
                                        <textarea 
                                            className="form-control"
                                            name="detail" 
                                            id="detail"
                                            placeholder="Add some task detail..."
                                            value={detail}
                                            onChange={handleSetDetail}>
                                        </textarea>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                            </button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">
                                    Add New Task
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </>
    );
}
