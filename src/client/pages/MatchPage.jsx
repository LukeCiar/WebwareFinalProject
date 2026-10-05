import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard.jsx";
import GameCard from "../components/game/GameCard"
import MatchForm from "../components/match/MatchForm"
import HandDropdown from "../components/match/HandDropdown";
import { getHandRules } from "../components/match/cardGames";

function MatchPage() {
    const matchId = useParams().matchId;
    const [match, setMatch] = useState()
    const [profilePictures, setProfilePictures] = useState({})
    const [game, setGame] = useState()
    const [modifying, setModifying] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMatch = async () => {
            const matchResponse = await fetch("/getFilteredMatches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: matchId})
            })
            const matchData = await matchResponse.json()
            setMatch(matchData[0])
        }

        fetchMatch()
    }, [modifying])

    useEffect(() => {
        if(!match) { return undefined }
        const fetchGame = async () => {
            const gameResponse = await fetch("/getFilteredGames", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name: match.gameName})
            })
            const gameData = await gameResponse.json()
            setGame(gameData[0])
        }
        fetchGame()
    }, [match])

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await (await fetch("/getUsers")).json()
            setProfilePictures(Object.fromEntries(users.map(u => [u.username, u.profilePicture])))
        }
        fetchUsers()
    }, [match])

    const handleDelete = async () => {
        if(modifying) { setModifying(false) }

        const confirmed = window.confirm(`Are you sure you want to delete this match?`)
        if(confirmed) {
            await fetch("/deleteMatch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: match._id})
            })
            console.log("here")
            navigate("/")
        }
    }

    if (match === undefined) {
        return <p>Could not find this match</p>
    }

    return (
        <>
            <h1>{match.datePlayed} Match of {match.gameName}</h1>

            {/* Update to reflect new GameCard */}
            {game && <GameCard game={game} className="w-50" />}
            
            <h2> Players: </h2>
            <div className="d-flex flex-wrap gap-3">
                {match.players.map((player, i) => (
                    <div key={i} className="d-flex flex-column align-items-center">
                        <UserCard user={{username: player.name, profilePicture: profilePictures[player.name]}} />
                        {player.hand?.length > 0 && getHandRules(game) && (
                            <HandDropdown hand={player.hand} game={getHandRules(game)} />
                        )}
                        {player.score && (
                            <span>Score: {player.score}</span>
                        )}
                    </div>
                ))}
            </div>

            <h2>Notes:</h2>
            {match.notes}

            <div className="w-25 m-auto d-flex">
                <button
                    onClick = {() => modifying ? setModifying(false) : setModifying(true)}
                    className = "btn btn-warning"
                >
                    Modify Match
                </button>

                <button
                    onClick = {handleDelete}
                    className = "btn btn-danger ms-auto"
                >
                    Delete Match
                </button>
            </div>
            
            {modifying && 
                <MatchForm onSubmit={() => setModifying(false)} matchToEdit={match} />
            }
        </>
    )
}

export default MatchPage;
