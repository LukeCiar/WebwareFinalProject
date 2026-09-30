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

app.get("/getGames", async (req, res) => {
    const games = await db.getAllGames()
    res.status(200).send(games)
})

//see the doc comment on getFilteredGames for details
app.get("/getFilteredGames", async (req, res) => {
    const games = await db.getFilteredGames(req.body.filter)
    res.status(200).send(games)
})

app.post("/deleteGame", async (req, res) => {
    await db.deleteGame(req.body.name)
    res.status(200).end()
})

//----------------Matches----------------

app.post("/addMatch", async (req, res) => {
    await db.addMatch(req.body)
    res.statusCode(201).end()
})

app.get("/getMatches", async (req, res) => {
    const matches = await db.getAllMatches()
    res.status(200).send(matches)
})

//See the doc comment on getFilteredMatches for details
app.get("/getFilteredMatches", async (req, res) => {
    const matches = await db.getFilteredMatches(req.body.filter)
    res.status(200).send(matches)
})

//See the doc comment on modifyMatch for details
app.post("/modifyMatch", async (req, res) => {
    await db.modifyMatch(req.body.oldId, req.body.newMatch)
    res.status(200).end()
})

app.post("/deleteMatch", async (req, res) => {
    await db.deleteMatch(req.body.id)
    res.status(200).end
})

//----------------Users----------------

app.post("/addUser", async (req, res) => {
    await db.addUser(req.body)
    res.statusCode(201).end()
})

app.get("/getUsers", async (req, res) => {
    const users = await db.getAllUsers()
    res.status(200).send(users)
})

app.post("/getUserByName", async (req, res) => {
    const user = await db.getUserByName(req.body.username)
    // User can evaluate to null if none is found and .send(null) causes an error when being parsed
    res.status(200).json(user)
})

//See the doc comment on modifyUser for details
app.post("/modifyUser", async (req, res) => {
    await db.modifyUser(req.body.username, req.body.update)
    res.status(200).end()
})

app.post("/deleteUser", async (req, res) => {
    await db.deleteUser(req.body.username)
    res.status(200).end()
})

//--------------------------------

const port = process.env.PORT || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
