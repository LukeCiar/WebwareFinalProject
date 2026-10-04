import { useState, useEffect } from "react"
import GameList from "../components/game/GameList"
import GameForm from "../components/game/GameForm"

function AllGamesPage() {
    const [games, setGames] = useState([])
    const [reloadGames, setReloadGames] = useState(0)

    useEffect(() => {
        const fetchGames = async () => {
            const gResponse = await fetch("/getGames", {
                method: "GET"
            })
            const gData = await gResponse.json()
            setGames(gData)
        }
        fetchGames()
    }, [reloadGames])

    return (
        <div className="container-fluid px-4">
            <div className="row">
                <section className="col">
                    <h2>All Games</h2>
                    <GameList games={games} />
                </section>
            </div>
            <div className="row">
                <h3>Can't find a Game you Love? Feel free to add it!</h3>
                <GameForm className="col" onSubmit={() => setReloadGames(reloadGames+1)} />
            </div>
        </div>
    )   
}
export default AllGamesPage;
