import GameCard from "./GameCard"

function GameList({games}) {
    return (
        <table>
            <style> {`
                table, th, td {
                    border-collapse: collapse;
                    border: 1px solid;
                    padding: .3rem;
                `}
            </style>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Game</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {games.map((g) => <GameCard key = {g._id} game={g} />)}
            </tbody> 
        </table>
    )
}

export default GameList