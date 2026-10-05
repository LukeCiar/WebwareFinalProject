import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import MatchList from "../components/match/MatchList.jsx";
import MatchForm from "../components/match/MatchForm.jsx";
import EditGameForm from "../components/game/EditGameForm.jsx";

function GamePage() {
    const [game, setGame] = useState()
    const [matches, setMatches] = useState([])
    const [reload, setReload] = useState(0)
    const gameName = useParams().gameName
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGame = async () => {
            const gameResponse = await fetch("/getFilteredGames", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name: gameName})
            })
            const gameData = await gameResponse.json()
            setGame(gameData[0])
        }

        const fetchMatches = async () => {
            const matchResponse = await fetch("/getFilteredMatches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({gameName})
            })
            const matchData = await matchResponse.json()
            setMatches(matchData)
        }

        fetchGame()
        fetchMatches()
    }, [reload])

    const deleteGame = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${game.name}?`)
        if (confirmed) {
            await fetch("/deleteGame", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name: game.name})
            })
            navigate("/")
        }
    }

    if(game === undefined) {
        return (
            <>
                <h1 style={{textAlign: "center"}}>{gameName}</h1>
                <p>Sorry, {gameName} is not a valid game. To make it valid, add it on the home page.</p>
            </>
        )
    }

    return (
        <div style={{width: "60rem", margin: "0 auto"}} className="py-2">
           <h1 style={{textAlign: "center"}} className="mb-4">{game.name}</h1>
           <img style={{display: "block", margin: "0 auto"}}
                className="my-2"
                src={ game.image ? `/gamePictures/${game.image}` : "/game-missing-image.png" }
                alt={ `Picture of ${game.name}` }
            />
            <div className="d-flex justify-content-center gap-2 mb-3">
                <EditGameForm game={game} onSubmit={() => setReload(reload+1)} />
                <MatchForm key={game.name} gameName={game.name} onSubmit={() => setReload(reload+1)} />
            </div>
            {game.description &&
                <p>
                    <strong>Description:</strong> {game.description}
                </p>
            }
            {game.tags && 
                <p>
                    <strong>Tags:</strong> {game.tags.join(", ")}
                </p>
            }

            <h2>Matches of this Game:</h2>
            <MatchList matches={[...matches].reverse()}/>

            <button 
                onClick={deleteGame}
                className="btn btn-danger mt-2"
                style={{display: "block", margin: "0 auto"}}
            >
                Delete Game
            </button>
        </div>
    )
}

export default GamePage;
