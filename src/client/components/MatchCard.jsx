function MatchCard({ match }) {
    return (
        <tr>
            <td>Game Played: {match.gameName}</td>
            <td>Players: {match.players.join(" ")}</td>
        </tr>
    )   
}
export default MatchCard;
