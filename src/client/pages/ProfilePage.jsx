import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import Achievements from "../components/Achievements";
import ProfilePicture from "../components/ProfilePicture";
import MatchList from "../components/match/MatchList";

// Values for what "page" to display: the default one or one that lets you edit something
const NO_CHANGES = 0;
const CHANGE_PROFILEPICTURE = 1;
const CHANGE_USERNAME = 2;
const CHANGE_PASSWORD = 3;
const CHANGE_BIO = 4;

const postJson = (url, body) => fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
});

function ProfilePage() {
    // user is the currently logged in user (null when signed out), see App.jsx
    const { user, setUser, userLoaded } = useOutletContext();

    // Get profilePicture and achivements list from server from currently logged in person
    //const bio = "Some text about me...";
    const achivements = [];

    const [changeSettings, setChangeSettings] = useState(NO_CHANGES);
    const [bioDraft, setBioDraft] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [error, setError] = useState("");
    const [matches, setMatches] = useState([])
    
    useEffect(() => {
        if (user != null) {
            const fetchMatches = async () => {
                const mResponse = await fetch("/getFilteredMatches", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"players.name": user.username})
                })
                const mData = await mResponse.json()
                setMatches(mData)
            }
            fetchMatches()
        }
    }, [user])


    // Wait until we know whether anyone is logged in before redirecting
    if (!userLoaded) return null;
    if (user === null) return <Navigate to="/login" replace />;

    const stopEditing = () => {
        setChangeSettings(NO_CHANGES);
        setError("");
    };

    // Sends an update to the server, then runs onSuccess with the response body
    const save = async (url, body, onSuccess) => {
        const response = await postJson(url, body);
        const data = await response.json();
        if (!response.ok) {
            setError(data.error || "Something went wrong");
            return;
        }
        onSuccess(data);
        stopEditing();
    };

    const startBioEdit = () => {
        setBioDraft(user.bio ?? "");
        setChangeSettings(CHANGE_BIO);
    };

    const changeBio = () => save("/api/profile/bio", { bio: bioDraft },
        (data) => setUser({ ...user, bio: data.bio }));

    const changeUsername = () => save("/api/profile/username", { username: newUsername },
        (data) => {
            setUser({ ...user, username: data.username });
            setNewUsername("");
        });

    const changePassword = () => save("/api/profile/password", { password: newPassword },
        () => setNewPassword(""));
    
    const changeProfilePicture = async function () {
        if (user != null) {
            const userResponse = await fetch("/modifyUser", 
                {method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {"username":user.username, "update":{"profilePicture":newProfilePicture} } ) 
                }
            )   
            stopEditing()    
        }
    }

    const profilePictureOptions = (() => {
        const radioButtons = []
        const profilePictures = ["default", "demon", "blackPawn", "blackRook", "blackKnight", "blackBishop", "blackQueen", "blackKing", "loveGames"]
        for (const picture of profilePictures) {
            radioButtons.push(
            <label htmlFor={picture} key={picture}>
                <input type="radio" id={picture} name="profilePictureButton" value={picture} onChange={(event) => setNewProfilePicture(event.target.value)} />
                <ProfilePicture name={picture} alttext={picture}/>
            </label>
        )}
        return(radioButtons)
    })

    const popupManager = () => {
        if (changeSettings == CHANGE_PROFILEPICTURE) {
            return (
                <>
                    {profilePictureOptions()}
                    <button onClick={stopEditing}>Cancel</button>
                    <button onClick={changeProfilePicture}>Submit</button>
                </>
            )
        }
        else if (changeSettings == CHANGE_USERNAME) {
            return (
                <>
                    <p>Please enter a new Username</p>
                    <input value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                    <button onClick={stopEditing}>Cancel</button>
                    <button onClick={changeUsername}>Submit</button>
                </>
            )
        }
        else if (changeSettings == CHANGE_PASSWORD) {
            return (
                <>
                    <p>Please enter a new Password</p>
                    <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                    <button onClick={stopEditing}>Cancel</button>
                    <button onClick={changePassword}>Submit</button>
                </>
            )
        }
        else if (changeSettings == CHANGE_BIO) {
            return (
                <>
                    <textarea className="form-control" value={bioDraft} maxLength={500} onChange={(event) => setBioDraft(event.target.value)} />
                    <br />
                    <button onClick={stopEditing}>Cancel</button>
                    <button onClick={changeBio}>Save Change</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button className="form-control" onClick={startBioEdit}>
                        <p>
                            {user.bio || "Click to add a bio..."}
                        </p>
                    </button>

                    <section>
                        <h2> Achivements: </h2>
                        <Achievements username={user.username} />
                    </section>

                    <section>
                        <h2> Recently Played Games: </h2>
                        <MatchList matches={[...matches].reverse()} />
                    </section>
                </>
            )
        }
    };

    return (
        <>  
            <div className="input-group mb-3">
                <button className="input-group-prepend" onClick={() => setChangeSettings(CHANGE_PROFILEPICTURE)}>
                    {user == null ?
                    <ProfilePicture name={""} alttext={""}/>
                    :
                    <ProfilePicture name={user.profilePicture} alttext={user.username+"'s profile picture showing a "+user.profilePicture}/>
                    }
                </button>
                <button className="input-group-text" onClick={() => setChangeSettings(CHANGE_USERNAME)}>
                    <h1>
                        {user.username}
                    </h1>
                </button>
            </div>
            <button onClick={() => setChangeSettings(CHANGE_USERNAME)}>
                Change Username
            </button>
            <button onClick={() => setChangeSettings(CHANGE_PASSWORD)}>
                Change Password
            </button>

            <br />

            {error && <p style={{ color: "#dc3545" }}>{error}</p>}

            {popupManager()}
        </>
    )
}
export default ProfilePage;
