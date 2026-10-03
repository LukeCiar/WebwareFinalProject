function GameCard({ game }) { 
    return (
        <tr>
            <td>{game.name}</td>
            <td>{game.description}</td>
        </tr>
    ) 
}
export default GameCard;
