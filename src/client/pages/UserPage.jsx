
import {useParams} from "react-router-dom"

function UserPage() { 
    const { username } = useParams();
    // Given username get the profilePicture, bio, and achivements list from server
    const profilePicture = "none";
    const bio = "Some text about me...";
    const achivements = [];

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
            {/*
                This shoule be an achivements component, either just a list of all achivemnts where some are achived and some not
                Or just show achived achivements which should still be a list of Achviements components just with paramaters for what achivement
            */}

            <h2> Recently Played Games: </h2>
            {/*
                I am not sure if we want to implement this or not but it was something we mentioned possibly doing
            */}
        </>
    )   
}
export default UserPage;
