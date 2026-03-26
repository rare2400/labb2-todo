import { useState } from "react";
import "./TodoForm.css";

// props definition får component with onAdd function from parent to create new todo
interface Props {
    onAdd: (title: string, description: string) => void;
}

const TodoForm = ({ onAdd }: Props) => {
    // state for forminputs and validation error messages
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    // validate form inputs
    const validate = () => {
        const newErrors: { title?: string; description?: string } = {};
        if (title.trim().length < 3) {
            newErrors.title = "Titeln måste vara minst 3 tecken";
        }
        if (description.length > 200) {
            newErrors.description = "Beskrivningen får max vara 200 tecken";
        }

        // update error state
        setErrors(newErrors);

        //return true if no errors exists
        return Object.keys(newErrors).length === 0;
    };

    // handle the submit event
    const handleSubmit = (e: any) => {
        e.preventDefault();

        // stop submission if validation fails
        if (!validate()) return;

        // call parent function to add todo
        onAdd(title.trim(), description.trim());

        // reset form fields after successful submit, and clear error
        setTitle("");
        setDescription("");
        setErrors({});
    };

    return (
        <>
            <form className="todo-form" onSubmit={handleSubmit}>
                <h2>Lägg till uppgift</h2>
                <div className="form-group">
                    <label>Title *</label>
                    {/* controlled input for title and show validation error if exists */}
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ange titel" />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label>Beskrivning (valfri)</label>
                    {/* controlled textarea for description and show validation error if exists */}
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ange beskrivning..." />
                    <span className="char-count">{description.length}/200</span>
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <button className="submit-btn" type="submit">Lägg till</button>
            </form>
        </>
    )
}

export default TodoForm;
