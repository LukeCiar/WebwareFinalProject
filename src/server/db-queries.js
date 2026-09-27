import "dotenv/config"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)

let gameCollection
let matchCollection
let userCollection
export let initialized = false

/**
 * IMPORTANT: Needs to be called before any other database functions.
 * Initializes the collections for other db functions to use.
 * Returns true on success, or throws an error.
 */
export const init = async () => {
    try {
        gameCollection = await client.db("final-project").collection("games")
        matchCollection = await client.db("final-project").collection("matches")
        userCollection = await client.db("final-project").collection("users")

        //force game name to be unique
        gameCollection.createIndex(
            { name: 1 },
            { unique: true }
        )

        initialized = true
        return true
    }
    catch (e) {
        throw e
    }
}

//----------------Games----------------

export const addGame = async (game) => {
    //TODO: check fields?
    const id = await gameCollection.insertOne(game)
}



//----------------Matches----------------

export const addMatch = async (match) => {
    //TODO: check fields?
    matchCollection.insertOne(match)
}

export const getAllMatches = async () => {
    const matches = await matchCollection.find().toArray()
    return matches
}



//----------------Users----------------