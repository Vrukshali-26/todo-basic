import { FormEvent, useState } from "react";

interface updateTodo {
    title?: string;
    description?: string;
}

export default function UpdateTodo({ id }: { id: string }) {
    const [updateTodo, setUpdateTodo] = useState<updateTodo>({
        title: "",
        description: "",
    });

    async function updateTodoFunc(e: FormEvent) {
        e.preventDefault();
        console.log(updateTodo);

        const request = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: updateTodo.title,
                description: updateTodo.description,
            }),
        });
        const response = await request.json();
        alert("Updated Todo");
        window.location.reload();
        console.log(response);
    }

    return (
        <div className="hero">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={updateTodoFunc} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="title"
                            onChange={(e) =>
                                setUpdateTodo({
                                    ...updateTodo,
                                    title: e.target.value,
                                })
                            }
                            value={updateTodo.title}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            placeholder="description"
                            onChange={(e) =>
                                setUpdateTodo({
                                    ...updateTodo,
                                    description: e.target.value,
                                })
                            }
                            value={updateTodo.description}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update Todo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
