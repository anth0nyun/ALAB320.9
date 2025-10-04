import { useMemo, useReducer, useState } from "react";
import { todosReducer } from "../hooks/todosReducer.js";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";

export default function TodoApp() {
   
    const [todos, dispatch] = useReducer(todosReducer, []);


    const [filter, setFilter] = useState("all"); 

    const remaining = useMemo(
        () => todos.filter(t => !t.completed).length,
        [todos]
    );

    const visibleTodos = useMemo(() => {
        switch (filter) {
            case "active": return todos.filter(t => !t.completed);
            case "completed": return todos.filter(t => t.completed);
            default: return todos;
        }
    }, [todos, filter]);

    // Action helpers
    const addTodo = (text) => dispatch({ type: "add", text });
    const toggleTodo = (id) => dispatch({ type: "toggle", id });
    const removeTodo = (id) => dispatch({ type: "remove", id });
    const editTodo = (id, text) => dispatch({ type: "edit", id, text });
    const clearCompleted = () => dispatch({ type: "clearCompleted" });
    const toggleAll = (completed) => dispatch({ type: "toggleAll", completed });

    const allCompleted = todos.length > 0 && remaining === 0;

    return (
        <div className="app stack">
            <header className="stack">
                <h1>Todo Lab</h1>
                <p className="small">useReducer + controlled inputs</p>
            </header>

            <section className="stack">
                <TodoForm onAdd={addTodo} />

                <div className="row">
                    <div className="filters">
                        <button className={filter === "all" ? "active" : "ghost"} onClick={() => setFilter("all")}>All</button>
                        <button className={filter === "active" ? "active" : "ghost"} onClick={() => setFilter("active")}>Active</button>
                        <button className={filter === "completed" ? "active" : "ghost"} onClick={() => setFilter("completed")}>Completed</button>
                    </div>

                    <div style={{ marginLeft: "auto" }} className="row">
                        <button className="ghost" onClick={() => toggleAll(!allCompleted)}>
                            {allCompleted ? "Uncheck all" : "Check all"}
                        </button>
                        <button className="danger" onClick={clearCompleted} disabled={todos.every(t => !t.completed)}>
                            Clear Completed
                        </button>
                    </div>
                </div>

                <TodoList
                    todos={visibleTodos}
                    onToggle={toggleTodo}
                    onRemove={removeTodo}
                    onEdit={editTodo}
                />
            </section>

            <footer className="footer">
                <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
                <span className="small">{todos.length} total</span>
            </footer>
        </div>
    );
}