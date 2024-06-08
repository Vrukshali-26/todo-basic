import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import Button from "./components/Button";
import CreateTodo from "./components/CreateTodo";

export interface Todo {
    _id: string;
    title: string;
    description: string;
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [show, setShow] = useState<boolean>(false);

    async function getTodos() {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        // console.log(data);
        setTodos(data.todos);
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="container mt-10">
            <h1 className="text-extrabold text-3xl text-yellow-600 text-center">
                Todo App
            </h1>
            <div className="m-10">
                <Button onClick={() => setShow(!show)} text="Create Todo" />
                {show && <CreateTodo />}
            </div>

            <div className="m-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {todos.map((todo, idx) => (
                    <TodoCard key={idx} todo={todo} />
                ))}
            </div>
        </div>
    );
}
