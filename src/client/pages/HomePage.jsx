import { useState, useEffect } from "react"
import MatchCard from "../components/MatchCard"
import GameCard from "../components/GameCard"
import MatchForm from "../components/MatchForm"
import GameForm from "../components/GameForm"

function HomePage() {
    const [matches, setMatches] = useState([])
    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const mResponse = await fetch("/getMatches", {method: "GET"})
            const mData = await mResponse.json()
            setMatches(mData)

            const gResponse = await fetch("/getGames", {method: "GET"})
            const gData = await gResponse.json()
            setGames(gData)
        }
        fetchData()
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
                <section>
                    <h2>Recent Matches</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((m) => <MatchCard key = {m._id} match={m} />)}
                        </tbody> 
                    </table>
                </section>
                <section>
                    <h2>Popular Games</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((g) => <GameCard key = {g._id} game={g} />)}
                        </tbody> 
                    </table>
                </section>

                <MatchForm />
                <GameForm />
            </div>
        </>
    )   
}
export default HomePage;
