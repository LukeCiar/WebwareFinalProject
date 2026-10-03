
import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import Achievements from "../components/Achievements"
import ProfilePicture from "../components/profilePicture"

function UserPage() { 
    const { username } = useParams();
    const [userExists, setUserExists] = useState(false);
    // Given username get the profilePicture, bio, and achivements list from server
    const [profilePicture, setProfilePicture] = useState("");
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
            console.log("user", user)
            setBio(user?.bio ?? "")
            setProfilePicture(user?.profilePicture ?? "")
            console.log("profilePicture", profilePicture)
            setUserExists(user == null)
        }
        fetchUser()
    }, [username])

    return (
        <>  
            <ProfilePicture name={profilePicture} alttext={username+"'s profile picture showing a "+profilePicture}/>
            
            {userExists ? 
                <h1>
                    {username+" (No account created)"}
                </h1>
                :
                <>
                    <h1>
                        {username}
                    </h1>
                    <p> 
                        {bio}
                    </p>
                    <h2> Achivements: </h2>
                    <Achievements username={username} />
                </>
            }

            <h2> Recently Played Games: </h2>
            {/*
                I am not sure if we want to implement this or not but it was something we mentioned possibly doing
            */}
        </>
    )   
}
export default UserPage;
