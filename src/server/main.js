import express from "express";
import ViteExpress from "vite-express";
import * as db from "./db-queries.js"

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    if(!db.initialized) { db.init() }
    next()
})

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post("/add", (req, res) => {
    db.addGame(req.body)
})

const port = process.env.PORT || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
