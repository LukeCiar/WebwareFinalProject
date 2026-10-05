import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard.jsx";
import HandDropdown from "../components/match/HandDropdown";
import { getHandRules } from "../components/match/cardGames";

function MatchPage() {
    const matchId = useParams().matchId;
    // undefined while loading, null if there's no match with this id
    const [match, setMatch] = useState(undefined)
    const [profilePictures, setProfilePictures] = useState({})
    const [game, setGame] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            // There's no get-by-id endpoint, so find the match in the full list
            const matches = await (await fetch("/getMatches")).json()
            const foundMatch = matches.find(m => m._id === matchId) ?? null
            setMatch(foundMatch)

            // The game says how its starting hands are shown
            if (foundMatch) {
                const games = await (await fetch("/getFilteredGames", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({name: foundMatch.gameName})
                })).json()
                setGame(games[0] ?? null)
            }

            const users = await (await fetch("/getUsers")).json()
            setProfilePictures(Object.fromEntries(users.map(u => [u.username, u.profilePicture])))
        }
        fetchData()
    }, [matchId])

    if (match === undefined) return <p>Loading...</p>
    if (match === null) return <p>Sorry, that match doesn't exist.</p>

    return (
        <>
            <h1>Match {matchId} of {match.gameName}</h1>

            <h2> Players: </h2>
            <div className="d-flex flex-wrap gap-2">
                {match.players.map((player, i) => (
                    <div key={i} className="d-flex flex-column align-items-center">
                        <UserCard user={{username: player.name, profilePicture: profilePictures[player.name]}} />
                        {player.hand?.length > 0 && getHandRules(game) && (
                            <HandDropdown hand={player.hand} game={getHandRules(game)} />
                        )}
                    </div>
                ))}
            </div>

            <h2>Notes:</h2>
            {match.notes}
        </>
    )
}

export default MatchPage;
