from datetime import datetime
from config import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    task = db.Column(db.String(80), unique=False, nullable = False)
    detail = db.Column(db.String(120), unique=False, nullable = False)
    status = db.Column(db.Integer, default = 1, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'task': self.task,
            'detail': self.detail,
            'status': self.status,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }