import GameCard from "./GameCard"

function GameList({games}) {
    return (
        <table className="table table-bordered border-dark">
            <thead>
                <tr>
                    <th style={{width: "1%", whiteSpace: "nowrap"}}>Image</th>
                    <th>Game</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th style={{width: "1%", whiteSpace: "nowrap"}}></th>
                </tr>
            </thead>
            <tbody>
                {games.map((g) => <GameCard key = {g._id} game={g} />)}
            </tbody> 
        </table>
    )
}

export default GameList