import { useState, useEffect } from "react"

function MatchForm() {
    const [allGames, setAllGames] = useState([])
    const [numPlayers, setNumPlayers] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const gameResponse = await fetch("/getGames", { method: "GET" })
            const gameData = await gameResponse.json()
            setAllGames(gameData)
        }
        fetchData()
    }, [])

    const handleSubmit = async (formData) => {
        const matchData = {
            gameName: formData.get("gameName"),
            players: [],
            datePlayed: formData.get("datePlayed"),
            notes: formData.get("notes")
        }

        for (let i = 0; i < numPlayers; i++) {
            matchData.players.push({
                name: formData.get(`name_${i}`),
                score: formData.get(`score_${i}`),
                won: (formData.get(`winner`) == i)
            })
        }

        await fetch("/addMatch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(matchData)
        })
    }

    return (
        <>
            <form action={handleSubmit}>
                <label style={{display: "block"}}>
                    Game
                    <select name="gameName">
                        <option value="">-- Choose a game--</option>
                        {allGames.map(game => (
                            <option value={game.name}>{game.name}</option>
                        ))}
                    </select>
                </label>

                {Array.from({ length: numPlayers }).map((_, index) => (
                    <div>
                        Player {index+1} &nbsp; {/*&nbsp; forces a space - can get rid of once we have proper formatting*/}
                        <label>
                            Username/Name
                            <input type="text" name={`name_${index}`} />
                        </label>

                        <label>
                            Score
                            <input type="number" name={`score_${index}`} />
                        </label>

                        <label>
                            Won?
                            <input type="radio" name="winner" value={index} />
                        </label>
                    </div>
                ))}
                
                <div>
                    <button type="button" onClick={() => setNumPlayers(numPlayers+1)}>Add Player</button>
                    <button type="button" onClick={() => setNumPlayers(numPlayers-1)}>Remove Player</button>
                </div>

                <label style={{display: "block"}}>
                    Date Played
                    <input type="date" name="datePlayed" defaultValue={new Date().toISOString().split('T')[0]} />
                </label>

                <label style={{display: "block"}}>
                    Notes
                    <textarea name="notes"></textarea>
                </label>

                <input type="submit" value="Submit Match" />

            </form>
        </>
    )   
}
export default MatchForm;
