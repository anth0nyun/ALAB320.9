export function todosReducer(state, action) {
    switch (action.type) {
        case "add": {
            const text = action.text?.trim();
            if (!text) return state;
            return [
                ...state,
                { id: Date.now(), text, completed: false, createdAt: new Date().toISOString() },
            ];
        }
        case "toggle": {
            return state.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t);
        }
        case "remove": {
            return state.filter(t => t.id !== action.id);
        }
        case "edit": {
            const text = action.text?.trim();
            if (!text) return state;
            return state.map(t => t.id === action.id ? { ...t, text } : t);
        }
        case "clearCompleted": {
            return state.filter(t => !t.completed);
        }
        case "toggleAll": {
            const next = Boolean(action.completed);
            return state.map(t => ({ ...t, completed: next }));
        }
        default:
            return state;
    }
}