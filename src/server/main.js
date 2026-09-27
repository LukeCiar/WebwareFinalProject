import express from "express";
import ViteExpress from "vite-express";
import * as db from "./db-queries.js"

const app = express();

app.use(express.json())

app.use(async (req, res, next) => {
    if(!db.initialized) { await db.init() }
    next()
})

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post("/addGame", async (req, res) => {
    await db.addGame(req.body)
})

app.post("/addMatch", async (req, res) => {
    await db.addMatch(req.body)
})

app.get("/matches", async (req, res) => {
    const matches = await db.getAllMatches()
    res.status(200).send(matches)
})

const port = process.env.PORT || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
