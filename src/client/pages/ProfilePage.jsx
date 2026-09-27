import { useState } from "react";

function ProfilePage() { 
    // Get username, profilePicture, bio, and achivements list from server from currently logged in person
    const username = "Player 1";
    const profilePicture = "none";
    const bio = "Some text about me...";
    const achivements = [];

    const [isChangeProfilePicture, setChangeProfilePicture] = useState(false)
    const [isChangeUsername, setChangeUsername] = useState(false)
    const [isChangePassword, setChangePassword] = useState(false)
    const [isChangeBio, setChangeBio] = useState(false)

    const popupManager = (() => {
        if (isChangeProfilePicture) {
            return (
                <>  
                    <p>Select a new Profile Picutre (currently unsupported)</p>
                </>
            )  
        }
        else if (isChangeUsername) {
            return (
                <>
                    <p>Please enter a new Username (currently unsupported)</p>
                </>
            )  
        }
        else if (isChangePassword) {
            return (
                <>
                    <p>Please enter a new Password (currently unsupported)</p>
                </>
            )  
        }
        else if (isChangeBio) {
            return (
                <>
                    <input type="textbox" placeholder={bio}/>
                    <button onClick={() => setChangeBio(false)}>
                        Cancel
                    </button>
                    <button onClick={() => {changeBio()}}>
                        Save
                    </button>
                </>
            )  
        }
        else {
            return (
                <>
                    <button onClick={() => setChangeBio(!isChangeBio)}>
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
    })


    return (
        <>  
            <button onClick={() => setChangeProfilePicture(!isChangeProfilePicture)}>
                <img src={profilePicture} alt={username+"'s profile picture"} />
            </button>
            <button onClick={() => setChangeUsername(!isChangeUsername)}>
                <h1>
                    {username}
                </h1>
            </button>
            <button onClick={() => setChangePassword(!isChangePassword)}>
                Change Password
            </button>

            <br/>

            { popupManager() }

        </>
    )   
}
export default ProfilePage;
