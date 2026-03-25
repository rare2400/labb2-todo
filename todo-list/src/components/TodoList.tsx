import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import "./TodoList.css";

// props for TodoList component, receiving todos and handler functions from parent component
interface Props {
  todos: Todo[];
  onUpdateStatus: (id: number, status: Todo["status"]) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onUpdateStatus, onDelete }: Props) => {
  // render message if no todos exists
  if (todos.length === 0) return <p>Inget att göra än, lägg till en uppgift att göra!</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // render each todo using TodoItem component
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;