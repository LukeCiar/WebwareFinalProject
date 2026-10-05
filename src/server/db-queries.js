import "dotenv/config"
import { MongoClient, ObjectId } from "mongodb"

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

        //force game name and username to be unique
        gameCollection.createIndex(
            { name: 1 },
            { unique: true }
        )

        userCollection.createIndex(
            { username: 1 },
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
    await gameCollection.insertOne(game)
}

export const getAllGames = async () => {
    const games = await gameCollection.find().project({_id: 0}).toArray()
    return games
}

/**
 * @param {Object} filter A filter to apply to the games in the format { field: value }.
 * @returns The list of games that match the given filter
 */
export const getFilteredGames = async (filter) => {
    const games = await gameCollection.find(filter).project({_id: 0}).toArray()
    return games
}

export const deleteGame = async (name) => {
    await gameCollection.deleteOne({name})
}

//----------------Matches----------------

export const addMatch = async (match) => {
    matchCollection.insertOne(match)
}

export const getAllMatches = async () => {
    const matches = await matchCollection.find().sort({ datePlayed: 1 }).toArray()
    return matches
}

/**
 * @param {Object} filter A filter to apply to the matches in the format { field: value }.
 * To query players, use dot notation - { players.name: "John" } will return matches where John is a player.
 * This doesn't work for matching more than 1 field on a single player, but we can change that if needed
 * @returns The list of matches that match the given filter
 */
export const getFilteredMatches = async (filter) => {
    if (Object.hasOwn(filter, "id")) { //need to convert from String to ObjectID
        return await getFilteredMatches({"_id": new ObjectId(filter.id)})
    }
    const matches = await matchCollection.find(filter).sort({ datePlayed: 1 }).toArray()
    return matches
}

/**
 * Replaces a match with a new match
 * @param {string} oldId The id of the match to replace
 * @param {Object} newMatch The new match object to replace the old one with
 */
export const modifyMatch = async (oldId, newMatch) => {
    await matchCollection.replaceOne(
        { _id: new ObjectId(oldId) },
        newMatch
    )
}

export const deleteMatch = async (id) => {
    await matchCollection.deleteOne({ _id: new ObjectId(id) })
}

//----------------Users----------------

export const addUser = async (user) => {
    await userCollection.insertOne(user)
}

export const getAllUsers = async () => {
    const users = await userCollection.find().project({_id: 0, passwordHash: 0}).toArray()
    return users
}

export const getUserByName = async (username) => {
    const user = await userCollection.findOne({username}, {projection: {passwordHash: 0}})
    return user
}

/**
 * Only for authentication: unlike getUserByName, this includes the passwordHash.
 * Never send the result to the client.
 */
export const getUserForAuth = async (username) => {
    return await userCollection.findOne({username})
}

export const getUserById = async (id) => {
    return await userCollection.findOne({ _id: new ObjectId(id) }, {projection: {passwordHash: 0}})
}

/**
 * Updates one field to the new specified value
 * @param {string} username The username of the user to update
 * @param {Object} update The update to apply, in the format { field: newValue }
 */
export const modifyUser = async (username, update) => {
    //TODO: update references to this user too?
    await userCollection.updateOne(
        { username },
        { $set: update }
    )
}

/**
 * Changes a username, and updates the player name in every match they appear in.
 * Throws a duplicate key error (code 11000) if the new username is taken.
 */
export const renameUser = async (oldUsername, newUsername) => {
    await userCollection.updateOne(
        { username: oldUsername },
        { $set: { username: newUsername } }
    )
    await matchCollection.updateMany(
        { "players.name": oldUsername },
        { $set: { "players.$[p].name": newUsername } },
        { arrayFilters: [{ "p.name": oldUsername }] }
    )
}

export const deleteUser = async (username) => {
    await userCollection.deleteOne({username})
}