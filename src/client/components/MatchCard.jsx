function MatchCard({ match }) {
    return (
        <tr>
            <td>{match.gameName}</td>
            <td>{match.players.join(", ")}</td>
        </tr>
    )   
}
export default MatchCard;
