import {useParams} from "react-router-dom";
import MatchCard from "../components/match/MatchCard.jsx";

function GamePage() {
    const gameName = useParams().gameName;
    // TODO Use gameName to get the rest of the information from the database
    const gamePicture = "none";
    const gameInfo = "This game is a game in which players play a game. It has been played many times, and not played many more times. Critics agree that it is truly one of the games of all time.";
    const matches = [
        {gameName: gameName, players: ["Lex", "Ryan"]},
        {gameName: gameName, players: ["Luke", "Max", "Lex"]}
    ];

    return (
        <>
            <img src={gamePicture} alt={"Picture of " + gameName} />
            <h1>
                {gameName}
            </h1>
            <p>
                {gameInfo}
            </p>

            <h2> Recent Matches: </h2>
            {matches.map(match => (
                <MatchCard match={match} />
            ))}
        </>
    )
}
export default GamePage;
