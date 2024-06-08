import { useState } from "react";
import { Todo } from "../App";
import Button from "./Button";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

export default function TodoCard({ todo }: { todo: Todo }) {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="card w-96 bg-base-100 shadow-xl gap-10">
            <div className="card-body">
                <h2 className="card-title">{todo.title}</h2>
                <p>{todo.description}</p>
            </div>
            <div className="space-x-5">
                <Button text="Update Todo" onClick={() => setShow(!show)} />
                {show && <UpdateTodo id={todo._id} />}
                <DeleteTodo id={todo._id} />
            </div>
        </div>
    );
}
