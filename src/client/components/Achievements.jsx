import { useState, useEffect } from "react"

function Achievements({username}) { 
    // Storing an achivement in an dictionaly where key is achivement number and an achivement is a array of achivement name, description
    const LIST_OF_ACHIVEMENTS = {
        "1": ["Known Player", "Create an account", "demon"],
        "2": ["Starting out", "Play your first game", "blackPawn"],
        "3": ["Getting into it", "Participate in 5 matches", "blackRook"],
        "4": ["Player of games", "Participate in 10 matches", "blackKnight"],
        "5": ["Veteran Boardgamer", "Participate in 50 or more matches", "blackBishop"],
        "6": ["Winner!", "Win your first game", "blackQueen"],
        "7": ["Deus ex Machina", "Win 10 or more matches", "blackKing"],
        "8": ["Explorer", "Play 3 different types of games", "loveGames"],
        "9": ["Jack of all trades", "Play 10 or more different types of games", "loveGames"],
        "10": ["Dedication", "Win 5 different matches of the same game", "loveGames"]
    }

    const [completedAchievements, setCompletedAchievements] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (username != "") {
                // Get the current users achievements from server
                // Problem here is I don't think a get request can have a body
                const userResponse = await fetch("/getUserByName", 
                    {method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( {username} ) 
                    }
                )
                const userData = await userResponse.json();
                
                if (userData != null) {
                    //Get a list of completed achivements
                    //TODO: update userData.achievements with the naming scheme implemented when creating users
                    if (userData.achievements != null) {
                        setCompletedAchievements(userData.achievements)
                    }
                }
            }
        }
        fetchData()
    }, [username])

    // Given an achivement from LIST_OF_ACHIVEMETNS and a boolean of is it completed or not draw it
    const drawAchievement = function(key, achievement, completed) {
        const completedColor = completed ? "#FFD700":"#A3A3A3"
        //const style_color = `width: 200px; height: 300px; background-color: ${completedColor};`
        return (
            <div title={achievement[1]} key={key} style={{border:"1px solid black", width: "100px", height: "100px", backgroundColor: `${completedColor}`, position:"relative", textAlign:"center"}}>
                <p title={achievement[1]}>
                    {achievement[0]}
                </p>
                <img style={{position:"absolute", top:"45px", right:"25px"}} src={"../../../profilePictures/"+achievement[2]+".png"} alt={achievement[0]} width="50px" height="50px"/>
            </div>
        )
    }

        return (
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap:"auto"}}>
            {Object.entries(LIST_OF_ACHIVEMENTS).map( ([key, value]) => drawAchievement(key, value, completedAchievements.includes(key)) )}
        </div>
        )   
}
export default Achievements;
