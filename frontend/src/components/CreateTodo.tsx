import { FormEvent, useState } from "react";

interface Data {
    title: string;
    description: string;
}

export default function CreateTodo() {
    const [data, setData] = useState<Data>({ title: "", description: "" });

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        console.log(data);
        const request = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await request.json();
        alert("Created Todo");
        window.location.reload();
        console.log(response);
    }

    return (
        <div className="hero">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={submitForm} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="title"
                            onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                            }
                            value={data.title}
                            className="input input-bordered"
                            required
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
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                            value={data.description}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Create Todo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
