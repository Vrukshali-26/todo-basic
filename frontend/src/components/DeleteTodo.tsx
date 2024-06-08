export default function DeleteTodo({ id }: { id: string }) {
    async function deleteTodoFunc() {
        const request = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await request.json();
        alert("Deleted Todo");
        window.location.reload();
        console.log(response);
    }

    return (
        <button onClick={deleteTodoFunc} className="btn btn-primary">
            Delete Todo
        </button>
    );
}
