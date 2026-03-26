import { useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

// API URL without specification to be reused
const API_URL = "https://labb2-backend.onrender.com/api/todos";

function App() {
  // states for storing all todos, loading indicator when fetching data and handling error messages
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetching all todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null); //reset error before new request

      const res = await fetch(API_URL);

      // handle unsuccesful response
      if (!res.ok) throw new Error("Kunde inte hämta todos");
      const data: Todo[] = await res.json();

      // update state with the fetched todos
      setTodos(data);
    } catch (err) {
      setError("Något gick fel vid hämtning av todos");
    } finally {
      // stop loading when success OR failure
      setLoading(false);
    }
  };

  // run when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // add new todo with POST request
  const addTodo = async (title: string, description: string) => {
    try {
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: "not_started" }), // default status is "not_started"
      });
      if (!res.ok) throw new Error("Kunde inte skapa todo");
      const newTodo: Todo = await res.json();

      // add new todo on top of the list
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError("Något gick fel vid skapandet av todo");
    }
  };

  // update status of todo with PUT request
  const updateStatus = async (id: number, status: Todo["status"]) => {
    try {
      setError(null);

      // find the todo to update
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, status }), // send updated todo with new status
      });
      if (!res.ok) throw new Error("Kunde inte uppdatera todo");
      const updated: Todo = await res.json();

      // replace updated todo in state
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError("Något gick fel vid uppdateringen av todo");
    }
  };

  // delete todo byt ID
  const deleteTodo = async (id: number) => {
    try {
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Kunde inte ta bort todo");

      // remove deleted todo from state
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Något gick fel vid borttagning av todo");
    }
  };


  return (
    <>
      <div className="app">
        <h1>Att göra lista</h1>
        {error && <p className="error">{error}</p>}

        {/* form component for creating new todos */}
        <TodoForm onAdd={addTodo} />

        {/* render content based on loading state */}
        {loading ? (
          <p className="loading">Laddar...</p>
        ) : (
          <TodoList todos={todos} onUpdateStatus={updateStatus} onDelete={deleteTodo} />
        )}
      </div>
    </>
  )
}

export default App
