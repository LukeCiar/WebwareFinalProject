import { Link } from "react-router-dom"

function MatchCard({ match }) {
    return (
        <tr>
            <td>{match.gameName}</td>
            <td>{match.datePlayed}</td>
            <td>{match.players.map(p => `${p.name} ${p.won ? "(Won)" : ""}`).join(", ")}</td>
            <td>{match.notes}</td>
            <td style={{width: "1%", whiteSpace: "nowrap"}}><Link to={`/match/${match._id}`}>Details</Link></td>
        </tr>
    )
}
export default MatchCard;
