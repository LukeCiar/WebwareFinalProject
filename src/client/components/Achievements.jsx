import { useState, useEffect } from "react"

function Achievements({username}) { 
    // Storing an achivement in an dictionaly where key is achivement number and an achivement is a array of achivement name, description
    const LIST_OF_ACHIVEMENTS = {
        "1": ["Known Plyer", "Create an account"],
        "2": ["Starting out", "Play your first game"],
        "3": ["Getting into it", "Participate in 5 matches"],
        "4": ["Player of games", "Participate in 10 matches"],
        "5": ["Veteran Boardgamer", "Participate in 50 or more matches"],
        "6": ["Winner!", "Win your first game"],
        "7": ["Deus ex Machina", "Win 10 or more matches"],
        "8": ["Explorer", "Play 3 different types of games"],
        "9": ["Jack of all trades", "Play 10 or more different types of games"],
        "10": ["Dedication", "Win 5 different matches of the same game"]
    }

    const [completedAchievements, setCompletedAchievements] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (username != "") {
                // Get the current users achievements from server
                const userResponse = await fetch("/getUserByName", 
                    {method: "GET",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( {} ) 
                    }
                )
                const userData = await mResponse.json();
                setMatches(mData);

                //Get a list of completed achivements
                //TODO: update completedAchievements
            }
        }
        fetchData()
    })

    // Given an achivement from LIST_OF_ACHIVEMETNS and a boolean of is it completed or not draw it
    const drawAchievement = function(key, achievement, completed) {
        const completedColor = completed ? "#FFD700":"#A3A3A3"
        //const style_color = `width: 200px; height: 300px; background-color: ${completedColor};`
        return (
            <div key={key} style={{width: "200px", height: "300px", backgroundColor: `${completedColor}`}}>
                <p title={achievement[1]}>
                    {achievement[0]}
                </p>
            </div>
        )
    }

    return (
        <>
            {Object.entries(LIST_OF_ACHIVEMENTS).map( ([key, value]) => drawAchievement(key, value, completedAchievements.includes(key)) )}
        </>
    )   
}
export default Achievements;
