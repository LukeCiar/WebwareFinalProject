import { useState, useEffect } from "react"
import AwardAchievementsFunction from "../AwardAchievementsFunction"

//Only set matchToEdit if this is editing a match, not if it is creating a new match
function MatchForm({onSubmit, matchToEdit}) {
    const [allGames, setAllGames] = useState([])
    const [numPlayers, setNumPlayers] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const gameResponse = await fetch("/getGames", { method: "GET" })
            const gameData = await gameResponse.json()
            setAllGames(gameData)
        }
        fetchData()

        setNumPlayers(matchToEdit?.players.length || 0)
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

        if(matchToEdit) {
            await fetch("/modifyMatch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({oldId: matchToEdit._id, newMatch: matchData})
            })
        }
        else {
            await fetch("/addMatch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(matchData)
            })
        }

        // Award achievements to any players that would get new ones from participating in this match
        await AwardAchievementsFunction(matchData.players.map((player) => player.name))

        if(onSubmit) { onSubmit() } //prop from the caller - currently used to refresh the list on the home page
    }

    return (
        <>
            <form action={handleSubmit}>
                <label style={{display: "block"}}>
                    Game
                    <select
                        name="gameName"
                        defaultValue={matchToEdit?.gameName}
                        key={allGames.length /*Makes it reload once the games are fetched*/}
                    >
                        <option value="">-- Choose a game--</option>
                        {allGames.map(game => (
                            <option key={game.name} value={game.name}>{game.name}</option>
                        ))}
                    </select>
                </label>

                {Array.from({ length: numPlayers }).map((_, index) => (
                    <div key={index}>
                        Player {index+1} &nbsp; {/*&nbsp; forces a space - can get rid of once we have proper formatting*/}
                        <label>
                            Username/Name
                            <input type="text" name={`name_${index}`} defaultValue={matchToEdit?.players[index].name} />
                        </label>

                        <label>
                            Score
                            <input type="number" name={`score_${index}`} defaultValue={matchToEdit?.players[index].score} />
                        </label>

                        <label>
                            Won?
                            <input type="radio" name="winner" value={index} defaultChecked={matchToEdit?.players[index].won} />
                        </label>
                    </div>
                ))}
                
                <div>
                    <button type="button" onClick={() => setNumPlayers(numPlayers+1)}>Add Player</button>
                    <button type="button" onClick={() => setNumPlayers(numPlayers-1)}>Remove Player</button>
                </div>

                <label style={{display: "block"}}>
                    Date Played
                    <input
                        type="date"
                        name="datePlayed"
                        defaultValue={matchToEdit?.datePlayed || new Date().toISOString().split('T')[0]}
                    />
                </label>

                <label style={{display: "block"}}>
                    Notes
                    <textarea name="notes" defaultValue={matchToEdit?.notes} ></textarea>
                </label>

                <input type="submit" className="btn btn-primary" value="Submit Match" />

            </form>
        </>
    )   
}
export default MatchForm;
