import MatchCard from "./MatchCard"

function MatchList({matches}) {
    return (
        <table className="table table-bordered border-dark">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Date Played</th>
                    <th>Players</th>
                    <th>Notes</th>
                    <th style={{width: "1%", whiteSpace: "nowrap"}}></th>
                </tr>
            </thead>
            <tbody>
                {matches.map((m) => <MatchCard key = {m._id} match={m} />)}
            </tbody> 
        </table>
    )
}

export default MatchList