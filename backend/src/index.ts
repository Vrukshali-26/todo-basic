import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import { Todo } from "./config/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT as string;
const MONGO = process.env.MONGODB_URL as string;

mongoose
    .connect(MONGO)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Send a todo - POST method
app.post("/todos", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.json("Enter valid title and description");
    }

    const todo = await Todo.create({ title, description });
    return res.json({ message: todo });
});

// Get all Todos - GET method
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();

    res.json({ todos });
});

// Update all todos - PUT method
app.put("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    const updatedTodo: {
        title?: string;
        description?: string;
    } = {};
    if (title) {
        updatedTodo["title"] = title;
    }
    if (description) {
        updatedTodo["description"] = description;
    }

    const todo = await Todo.findById(id);
    if (todo) {
        await Todo.updateOne(updatedTodo);
    }
    return res.send({
        message: "Todo updated successfully!",
    });
});

// Delete a Todo - DELETE method
app.delete("/todos/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.json({ msg: "enter a valid ID" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.json({
        message: "Todo deleted successfully",
        todo: deletedTodo,
    });
});

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
});
