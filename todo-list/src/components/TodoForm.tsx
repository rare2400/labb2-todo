import { useState } from "react";
import "./TodoForm.css";

interface Props {
    onAdd: (title: string, description: string) => void;
}

const TodoForm = ({ onAdd }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const validate = () => {
        const newErrors: { title?: string; description?: string } = {};
        if (title.trim().length < 3) {
            newErrors.title = "Titeln måste vara minst 3 tecken";
        }
        if (description.length > 200) {
            newErrors.description = "Beskrivningen får max vara 200 tecken";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onAdd(title.trim(), description.trim());
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
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ange titel" />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label>Beskrivning (valfri)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ange beskrivning..." />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <button className="submit-btn" type="submit">Lägg till</button>
            </form>
        </>
    )
}

export default TodoForm;
