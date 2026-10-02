
import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import Achievements from "../components/Achievements"

function UserPage() { 
    const { username } = useParams();
    // Given username get the profilePicture, bio, and achivements list from server
    const profilePicture = "none";
    const [bio, setBio] = useState("");
    const achivements = [];

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch("/getUserByName", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            })
            const user = await response.json()
            setBio(user?.bio ?? "")
        }
        fetchUser()
    }, [username])

    return (
        <>  
            <img src={profilePicture} alt={username+"'s profile picture"} />
            <h1>
                {username}
            </h1>
            <p> 
                {bio}
            </p>

            <h2> Achivements: </h2>
            { <Achievements username={username} /> }

            <h2> Recently Played Games: </h2>
            {/*
                I am not sure if we want to implement this or not but it was something we mentioned possibly doing
            */}
        </>
    )   
}
export default UserPage;
