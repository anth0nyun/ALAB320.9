import { useState } from "react";

export default function TodoForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const value = text.trim();
        if (!value) return;
        onAdd(value);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className="row" aria-label="Add todo">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="New todo text"
            />
            <button className="primary" type="submit">Add</button>
        </form>
    );
}