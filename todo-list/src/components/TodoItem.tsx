import type { Todo } from "../types/todo";
import "./TodoItem.css";

// props for the todo item
interface Props {
  todo: Todo;
  onUpdateStatus: (id: number, status: Todo["status"]) => void;
  onDelete: (id: number) => void;
}

// mapping status values with swedish labels
const statusLabels: Record<Todo["status"], string> = {
  not_started: "Ej påbörjad",
  in_progress: "Pågående",
  completed: "Avklarad",
};

// Inline styles for colorcoded status badges
const statusColors: Record<Todo["status"], React.CSSProperties> = {
  not_started: { backgroundColor: "#f0f0f0", color: "#666" },
  in_progress: { backgroundColor: "#fff3cd", color: "#856404" },
  completed: { backgroundColor: "#d4edda", color: "#155724" },
};

const TodoItem = ({ todo, onUpdateStatus, onDelete }: Props) => {
  return (
    <li className="todo-item">
      <div>
        <h3>{todo.title}</h3>
        {/* only show description if it exists */}
        {todo.description && <p>{todo.description}</p>}
        {/* status badge with dynamic style and label */}
        <p className="status-badge" style={statusColors[todo.status]}>{statusLabels[todo.status]}</p>
      </div>
      <div className="todo-actions">
        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo.id, e.target.value as Todo["status"])}
        >
          <option value="not_started">Ej påbörjad</option>
          <option value="in_progress">Pågående</option>
          <option value="completed">Avklarad</option>
        </select>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Ta bort</button>
      </div>
    </li>
  );
};

export default TodoItem;