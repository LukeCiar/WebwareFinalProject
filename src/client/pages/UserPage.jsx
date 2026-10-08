
import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import Achievements from "../components/Achievements"
import ProfilePicture from "../components/ProfilePicture"
import MatchList from "../components/match/MatchList"
import WinLossRecord from "../components/WinLossRecord"

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
            setBio(user?.bio ?? "")
            setProfilePicture(user?.profilePicture ?? "")
            setUserExists(user == null)
        }
        fetchUser()
    }, [username])

    const [matches, setMatches] = useState([])
    useEffect(() => {
        const fetchMatches = async () => {
            const mResponse = await fetch("/getFilteredMatches", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"players.name": username})
            })
            const mData = await mResponse.json()
            setMatches(mData)
        }
        fetchMatches()
    }, [])

    return (
        <div className="m-3">
            <ProfilePicture name={profilePicture} alttext={username+"'s profile picture showing a "+profilePicture}/>
            
            <section>
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
                        <WinLossRecord username={username} matches={matches} />
                        <h2> Achivements: </h2>
                        <Achievements username={username} />
                    </>
                }
            </section>
            
            <section>
                <h2> Recently Played Games: </h2>
                <MatchList matches={[...matches].reverse()} matchCount={5} />
            </section>
        </div>
    )   
}
export default UserPage;
