import { useState, useEffect } from "react"

//pass in all usernames to check for new achivemetns
function AwardAchievementsFunction({listUsernames}) { 
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

    //
    console.log("usernames", listUsernames)
    

    const [completedAchievements, setCompletedAchievements] = useState([])

    useEffect(() => {
        const fetchAchievements = async (username) => {
            const userResponse = await fetch("/getUserByName", 
                {method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {username} ) 
                }
            )
            const userData = await userResponse.json();
            if (userData != null) {
                //TODO: update userData.achievements with the naming scheme implemented when creating users
                if (userData.achievements != null) {
                    return(userData.achievements)
                }
            }    
            // No Achievements to return
            return([])
        }

        const fetchMatches = async (username) => {
            const userResponse = await fetch("/getFilteredMatches", 
                {method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {"username":username} ) 
                }
            )
            const userData = await userResponse.json();
            return(userData)
        }

        for (const username in listUsernames) {
            const achievements = await fetchAchievements(username)
            const userMatches = await fetchMatches(username)

            if(!achievements.includes("1")) {
                // Create an account
                // This should really be a seperate case but is fine for now
                achievements.push("1")
            }
            if(!achievements.includes("2")) {
                // Play your first game
                achievements.push("2")
            }
            if(!achievements.includes("3")) {
                // Play your 5 games
                if (length(userMatches) >= 5) {
                    achievements.push("3")
                }
            }
            if(!achievements.includes("4")) {
                // Play your 10 games
                if (length(userMatches) >= 10) {
                    achievements.push("4")
                }
            }
            if(!achievements.includes("5")) {
                // Play your 50 games
                if (length(userMatches) >= 50) {
                    achievements.push("5")
                }
            }
            if(!achievements.includes("6")) {
                // Win first
                if (length(userMatches.filter((match) => match.won == username) ) >= 1) {
                    achievements.push("6")
                }
            }
            if(!achievements.includes("7")) {
                // Win 10
                if (length(userMatches.filter((match) => match.won == username) ) >= 10) {
                    achievements.push("7")
                }
            }
            // 8 and 9 are number of different types of games played
            if(!achievements.includes("9")) {
                // Count different game types
                const gameTypes = []
                for (const match in userMatches) {
                    if (!gameTypes.includes(match.gameName)) {
                        gameTypes.push(match.gameName)
                    }
                }
                if(!achievements.includes("9") && !achievements.includes("9")) {
                // Play 3 different games
                    if (length(gameTypes ) >= 10) {
                        achievements.push("8")
                    }
                }
                
                // Play 10 differnet
                if (length(gameTypes ) >= 10) {
                    achievements.push("8")
                }
            }
            //Win 5 different matches of the same game
            if(!achievements.includes("10")) {
                const wonGames = userMatches.filter((match) => match.won == username)
                const gameTypes = {}
                for (const match in wonGames) {
                    if (!(match.gameName in gameTypes)) {
                        gameTypes[match.gameName] = 1
                    }
                    else {
                        gameTypes[match.gameName] += 1
                    }
                }
            }

        }
        

    })

    return
}
export default AwardAchievementsFunction;
