import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Working as expected");
});

app.listen(PORT, () => {
    console.log(`App working on PORT on ${PORT}`);
});
