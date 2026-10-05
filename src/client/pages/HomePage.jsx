import { useState, useEffect } from "react"
import MatchList from "../components/match/MatchList"
import GameList from "../components/game/GameList"
import MatchForm from "../components/match/MatchForm"
import GameForm from "../components/game/GameForm"

function HomePage() {
    const [matches, setMatches] = useState([])
    const [games, setGames] = useState([])
    const [reloadMatches, setReloadMatches] = useState(0)
    const [reloadGames, setReloadGames] = useState(0)

    useEffect(() => {
        const fetchMatches = async () => {
            const mResponse = await fetch("/getMatches", {method: "GET"})
            const mData = await mResponse.json()
            setMatches(mData)
        }
        fetchMatches()
    }, [reloadMatches])

    useEffect(() => {
        const fetchGames = async () => {
            const gResponse = await fetch("/getFilteredGames", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({official: true})
            })
            const gData = await gResponse.json()
            setGames(gData)
        }
        fetchGames()
    }, [reloadGames])

    return (
        <div className="container-fluid px-4">
            <div className="d-flex gap-2 mb-3">
                <MatchForm onSubmit={() => setReloadMatches(reloadMatches+1)} />
                <GameForm onSubmit={() => setReloadGames(reloadGames+1)} />
            </div>
            <div className="row">
                <section className="col">
                    <h2>Recent Matches</h2>
                    <MatchList matches={[...matches].reverse().slice(0,10)} />
                </section>
                <section className="col">
                    <h2>Official Games</h2>
                    <GameList games={games} />
                </section>
            </div>
        </div>
    )   
}
export default HomePage;
