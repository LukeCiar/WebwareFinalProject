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
                    gap: 2rem;
                    padding: 1rem;
                }

                section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            `} </style>
            <div id = "homeBody">
                <section>
                    <h2>Recent Matches</h2>
                    <MatchList matches={matches.slice(0,10)} />
                </section>
                <section>
                    <h2>Popular Games</h2>
                    <GameList />
                </section>
                <MatchForm />
                <GameForm />
            </div>
        </>
    )   
}
export default HomePage;
