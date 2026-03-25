// create an interface matching the database
export interface Todo {
    id: number;
    title: string;
    description: string;
    status: "not_started" | "in_progress" | "completed";
    created_at: string
}

// reuse status type from Todo to keep types consistent and avoid duplication
export type TodoStatus = Todo["status"];