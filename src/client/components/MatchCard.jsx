function MatchCard({ match }) {
    console.log(match)
    return (
        <tr>
            <td>{match.gameName}</td>
            <td>{match.datePlayed}</td>
            <td>{match.players.map(p => p.name).join(", ")}</td>
        </tr>
    )   
}
export default MatchCard;
