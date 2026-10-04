import MatchCard from "./MatchCard"

function MatchList({matches}) {
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
                    <th>Game</th>
                    <th>Date Played</th>
                    <th>Players</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {matches.map((m) => <MatchCard key = {m._id} match={m} />)}
            </tbody> 
        </table>
    )
}

export default MatchList