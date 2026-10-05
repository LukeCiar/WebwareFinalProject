import { Link } from "react-router-dom"

function GameCard({ game }) {
    return (
        <Link to={`/game/${game.name}`} className="card flex-row text-reset text-decoration-none">
            <img
                src={ game.image ? `/gamePictures/${game.image}` : "/game-missing-image.png" }
                alt={ `Picture of ${game.name}` }
                height="100px" width="100px"
                className="rounded-start"
            />
            <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">{game.description}</p>
                {game.tags?.map((tag) => <span key={tag} className="badge text-bg-secondary me-1">{tag}</span>)}
            </div>
        </Link>
    )
}
export default GameCard;
