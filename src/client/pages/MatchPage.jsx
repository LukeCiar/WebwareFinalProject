import {useParams} from "react-router-dom";
import UserCard from "../components/UserCard.jsx";

function MatchPage() {
    const matchId = useParams().matchId;
    const gameName = useParams().gameName;
    // TODO Use matchId to get the rest of the information from the database
    const players = [
        {profilePicture: "none", username: "Luke"},
        {profilePicture: "none", username: "Max"},
        {profilePicture: "none", username: "Lex"}
    ];
    const winner = "Max"
    const notes = "This was a closely contested match, until Max drew the 27 of spades and crushed us all. Good game!"

    return (
        <>
            <h1>Match {matchId} of {gameName}</h1>

            <h2> Players: </h2>
            {players.map(user => (
                <UserCard user={user} winner={user.username === winner} />
            ))}

            <h2>Notes:</h2>
            {notes}
        </>
    )
}

export default MatchPage;
