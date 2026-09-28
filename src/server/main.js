import express from "express";
import ViteExpress from "vite-express";
import * as db from "./db-queries.js"

const app = express();

app.use(express.json())

app.use(async (req, res, next) => {
    if(!db.initialized) { await db.init() }
    next()
})

//----------------Games----------------

app.post("/addGame", async (req, res) => {
    await db.addGame(req.body)
    res.statusCode(201).end()
})

app.get("/games", async (req, res) => {
    const games = await db.getAllGames()
    res.status(200).send(games)
})

//----------------Matches----------------

app.post("/addMatch", async (req, res) => {
    await db.addMatch(req.body)
    res.statusCode(201).end()
})

app.get("/matches", async (req, res) => {
    const matches = await db.getAllMatches()
    res.status(200).send(matches)
})

//----------------Users----------------

app.post("/addUser", async (req, res) => {
    await db.addUser(req.body)
    res.statusCode(201).end()
})

app.get("/users", async (req, res) => {
    const users = await db.getAllUsers()
    res.status(200).send(users)
})

const port = process.env.PORT || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
