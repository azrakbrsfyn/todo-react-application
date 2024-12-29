from flask import request, jsonify
from config import app, db
from models import Todo

# Get all todo
@app.route('/todo', methods=['GET'])
def get_todo():
    todos = Todo.query.all()
    json_todos = list(map(lambda x: x.to_json(), todos))
    return jsonify({"todos":json_todos})

# Get a contact by ID
@app.route('/todo/<int:task_id>', methods=['GET'])
def get_todoById(task_id):
    todo = Todo.query.get(task_id)
    json_todo= todo.to_json()

    if not todo:
        return(
            jsonify({'message': 'Task not found'}),
            404
        )
    
    return jsonify({
        "todo": json_todo
    })

# Create a todo
@app.route('/create_todo', methods=['POST'])
def create_todo():
    task = request.json.get("task")
    detail = request.json.get("detail")

    if not task or not detail:
        return (
            jsonify({'message': "You must include task and detail"}),
            400
        )
    
    new_todo = Todo(task = task, detail = detail)

    try:
        db.session.add(new_todo)
        db.session.commit()
    except Exception as e:
        return (
            jsonify({'message': str(e)}),
            400
        )
    
    return (
        jsonify({'message': 'Todo created successfully'}),
        201
    )

# Update a todo
@app.route('/update_todo/<int:task_id>', methods=['PATCH'])
def update_todo(task_id):
    todo = Todo.query.get(task_id)

    if not todo:
        return(
            jsonify({'message': "User not found"}),
            404
        )
    
    data = request.json
    todo.task = data.get('task', todo.task)
    todo.detail = data.get('detail', todo.detail)
    todo.status = data.get('status', todo.status)

    db.session.commit()

    return (
        jsonify({'message': "Todo updated succesfully"}),
        200
    )

# Delete a todo
@app.route('/delete_todo/<int:task_id>', methods = ['DELETE'])
def delete_todo(task_id):
    todo = Todo.query.get(task_id)

    if not todo:
        return (
            jsonify({'message': "Todo not found"}),
            404
        )
    
    db.session.delete(todo)
    db.session.commit()

    return (
        jsonify({'message': "Todo deleted succesfully!"}),
        200
    )

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)