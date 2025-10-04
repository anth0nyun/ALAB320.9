import { useState } from "react";

export default function TodoItem({ todo, onToggle, onRemove, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const startEdit = () => { setIsEditing(true); setEditText(todo.text); };
    const saveEdit = () => {
        const value = editText.trim();
        if (!value || value === todo.text) { setIsEditing(false); return; }
        onEdit(value);
        setIsEditing(false);
    };
    const onKeyDown = (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") setIsEditing(false);
    };

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`} role="listitem">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
            />

            {isEditing ? (
                <input
                    autoFocus
                    type="text"
                    className="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={saveEdit}
                    aria-label="Edit todo text"
                />
            ) : (
                <div className="text" onDoubleClick={startEdit}>{todo.text}</div>
            )}

            <div className="row">
                {!isEditing && (
                    <button className="ghost" onClick={startEdit} aria-label="Edit">Edit</button>
                )}
                <button className="danger" onClick={onRemove} aria-label="Delete">Delete</button>
            </div>
        </div>
    );
}