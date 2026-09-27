import { useState } from "react";

function ProfilePage() { 
    // Get username, profilePicture, bio, and achivements list from server from currently logged in person
    const username = "Player 1";
    const profilePicture = "none";
    const [bio, setBio] = useState("Some cool text about me...")
    //const bio = "Some text about me...";
    const achivements = [];

    // Values for what "page" to display default or one that lets you edit something
    const NO_CHANGES = 0;
    const CHANGE_PROFILEPICTURE = 1;
    const CHANGE_USERNAME = 2;
    const CHANGE_PASSWORD = 3;
    const CHANGE_BIO = 4;
    const [changeSettings, setChangeSettings] = useState(NO_CHANGES);

    // Other use states
    const [oldBio, setOldBio] = useState(bio);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changeBio = (() => {
        // Save changes to bio to server

        setOldBio(bio);
        // Stop "editing" bio
        setChangeSettings(NO_CHANGES);
    });

    const changeUsername = (() => {
        // TODO: not currently supported
        console.log("This function has not been finished");
        console.log("The username you entered was:", newUsername);
        setNewUsername("");
    })

    const changePassword = (() => {
        // TODO: not currently supported
        console.log("This function has not been finished");
        console.log("The password you entered was:", newPassword);
        setNewUsername("");
    })

    const popupManager = (() => {
        if (changeSettings == CHANGE_PROFILEPICTURE) {
            return (
                <>  
                    <p>Select a new Profile Picutre (currently unsupported)</p>
                </>
            )  
        }
        else if (changeSettings == CHANGE_USERNAME) {
            return (
                <>
                    <p>Please enter a new Username (currently unsupported)</p>
                    <input value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                    <button onClick={() => {setChangeSettings(NO_CHANGES)}}>
                        Cancel
                    </button>
                    <button onClick={() => {changeUsername()}}>
                        Submit
                    </button>
                </>
            )  
        }
        else if (changeSettings == CHANGE_PASSWORD) {
            return (
                <>
                    <p>Please enter a new Password (currently unsupported)</p>
                    <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                    <button onClick={() => {setChangeSettings(NO_CHANGES)}}>
                        Cancel
                    </button>
                    <button onClick={() => {changePassword()}}>
                        Submit
                    </button>
                </>
            )  
        }
        else if (changeSettings == CHANGE_BIO) {
            return (
                <>
                    <input type="textbox" placeholder={bio} value={bio} onChange={(event) => setBio(event.target.value)}/>
                    <button onClick={() => {setChangeSettings(NO_CHANGES); setBio(oldBio)}}>
                        Cancel
                    </button>
                    <button onClick={() => {changeBio()}}>
                        Save Change
                    </button>
                </>
            )  
        }
        else {
            return (
                <>
                    <button onClick={() => setChangeSettings(CHANGE_BIO)}>
                        <p> 
                            {bio}
                        </p>
                    </button>

                    <h2> Achivements: </h2>
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
    });


    return (
        <>  
            <button onClick={() => setChangeSettings(CHANGE_PROFILEPICTURE)}>
                <img src={profilePicture} alt={username+"'s profile picture"} />
            </button>
            <button onClick={() => setChangeSettings(CHANGE_USERNAME)}>
                <h1>
                    {username}
                </h1>
            </button>
            <button onClick={() => setChangeSettings(CHANGE_PASSWORD)}>
                Change Password
            </button>

            <br/>

            { popupManager() }

        </>
    )   
}
export default ProfilePage;
