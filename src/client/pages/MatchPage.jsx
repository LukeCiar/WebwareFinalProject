import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard.jsx";
import GameCard from "../components/game/GameCard"
import MatchForm from "../components/match/MatchForm"

function MatchPage() {
    const matchId = useParams().matchId;
    const [match, setMatch] = useState()
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
            {game && <table className="table w-75 mx-auto"><tbody><GameCard game={game}/></tbody></table>}
            
            {/*TODO need to show the score they got - wait for updated user card*/}
            <h2> Players: </h2>
            <table className="table w-50">
                <tbody>
                    {match.players.map(user => (
                        <UserCard key={user.username} user={user} winner={user.won} />
                    ))}
                </tbody>
            </table>

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
