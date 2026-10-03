import { Link } from "react-router-dom"

function GameCard({ game }) { 
    return (
        <tr>
            <td><img 
                    src={ game.image ? `/gamePictures/${game.image}` : "/game-missing-image.png" }
                    alt={ `Picture of ${game.name}` }
                    height="100px" width="100px"
            /></td>
            <td>{game.name}</td>
            <td>{game.description}</td>
            <td>{game.tags?.join(", ")}</td>
            <td><Link to={`/game/${game.name}`}>Details</Link></td>
        </tr>
    ) 
}
export default GameCard;
