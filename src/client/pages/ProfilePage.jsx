import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

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
    const [profilePicture, setProfilePicture] = useState("");
    //const bio = "Some text about me...";
    const achivements = [];

    const [changeSettings, setChangeSettings] = useState(NO_CHANGES);
    const [bioDraft, setBioDraft] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [error, setError] = useState("");

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
            console.log("supposed to change to", newProfilePicture)
            const userResponse = await fetch("/modifyUser", 
                {method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {"username":user, "update":{"profilePicture":newProfilePicture} } ) 
                }
            )   
            console.log("response:", userResponse)
        }
    }

    const profilePictureOptions = (() => {
        const radioButtons = []
        const profilePictures = ["default", "demon", "blackPawn", "blackRook", "blackKnight", "blackBishop", "blackQueen", "blackKing"]
        for (const picture of profilePictures) {
            radioButtons.push(
            <label htmlFor={picture} key={picture}>
                <input type="radio" id={picture} name="profilePictureButton" value={picture} onChange={(event) => setNewProfilePicture(event.target.value)} />
                <div style = {{backgroundColor: "#dc3545", width:"50px"}}>
                    <img src={"../../../profilePictures/"+picture+".png"} alt={picture} width="50" height="100" />
                </div>
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
                    <textarea value={bioDraft} maxLength={500} onChange={(event) => setBioDraft(event.target.value)} />
                    <br />
                    <button onClick={stopEditing}>Cancel</button>
                    <button onClick={changeBio}>Save Change</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={startBioEdit}>
                        <p>
                            {user.bio || "Click to add a bio..."}
                        </p>
                    </button>

                    <h2> Achievements: </h2>
                    {/*
                        Mimic User page here
                    */}

                    <h2> Recently Played Games: </h2>
                    {/*
                        Mimic user page here
                    */}
                </>
            )
        }
    };

    return (
        <>
            <button onClick={() => setChangeSettings(CHANGE_PROFILEPICTURE)}>
                <div style = {{backgroundColor: "#dc3545", width:"50px"}}>
                    {profilePicture == "" ? 
                    <img src="../../../profilePictures/default.png" alt="default profile picture" width="50" height="100"/>
                    :
                    <img src={"../../../profilePictures/"+profilePicture+".png"} alt={user+"'s profile picture"} width="50" height="100" />    
                    }
                </div>
            </button>
            <button onClick={() => setChangeSettings(CHANGE_USERNAME)}>
                <h1>
                    {user.username}
                </h1>
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
