import { useState, useEffect } from "react"
import GameCard from "./GameCard"

function GameList() {
    const [games, setGames] = useState([])

    useEffect(() => {
            const fetchGames = async () => {
                const gResponse = await fetch("/getGames", {method: "GET"})
                const gData = await gResponse.json()
                setGames(gData)
            }
            fetchGames()
        }, [])

    return (
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
    )
}

export default GameList