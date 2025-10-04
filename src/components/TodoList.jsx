import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onRemove, onEdit }) {
    if (!todos.length) {
        return <div className="empty">Nothing here yet. Add your first todo</div>;
    }
    return (
        <div className="stack" role="list">
            {todos.map((t) => (
                <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={() => onToggle(t.id)}
                    onRemove={() => onRemove(t.id)}
                    onEdit={(text) => onEdit(t.id, text)}
                />
            ))}
        </div>
    );
}