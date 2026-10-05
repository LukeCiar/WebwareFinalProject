import { useState, useEffect } from "react"
import MatchCard from "./MatchCard"

function MatchList({matches}) {
    // Lookups so each card can show the game's image and each player's profile picture
    const [gameImages, setGameImages] = useState({})
    const [profilePictures, setProfilePictures] = useState({})

    useEffect(() => {
        const fetchLookups = async () => {
            const games = await (await fetch("/getGames")).json()
            const users = await (await fetch("/getUsers")).json()
            setGameImages(Object.fromEntries(games.map(g => [g.name, g.image])))
            setProfilePictures(Object.fromEntries(users.map(u => [u.username, u.profilePicture])))
        }
        fetchLookups()
    }, [])

    return (
        <div className="d-flex flex-column gap-2">
            {matches.map((m) => (
                <MatchCard key = {m._id} match={m} gameImage={gameImages[m.gameName]} profilePictures={profilePictures} />
            ))}
        </div>
    )
}

export default MatchList
