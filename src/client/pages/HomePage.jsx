import { useState, useEffect } from "react"
import MatchList from "../components/match/MatchList"
import GameList from "../components/game/GameList"
import MatchForm from "../components/match/MatchForm"
import GameForm from "../components/game/GameForm"

function HomePage() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const mResponse = await fetch("/getMatches", {method: "GET"})
            const mData = await mResponse.json()
            setMatches(mData)
        }
        fetchMatches()
    }, [])

    return (
        <>
            <style> {`
                #homeBody {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }

                section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                table, th, td {
                    border-collapse: collapse;
                    border: 1px solid white;
                    padding: .5rem;
                }
            `} </style>
            <div id = "homeBody">
                <MatchList matches={matches.slice(0,10)} />
                <GameList />
                <MatchForm />
                <GameForm />
            </div>
        </>
    )   
}
export default HomePage;
