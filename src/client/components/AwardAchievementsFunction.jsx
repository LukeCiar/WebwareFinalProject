//pass in all usernames to check for new achivemetns
async function AwardAchievementsFunction(listUsernames) { 
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

    // testing
    console.log("usernames", listUsernames)
    
    // Function to get Achievements for a user
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

    // Function to get Matches for a user
    const fetchMatches = async (username) => {
        const userResponse = await fetch("/getFilteredMatches", 
            {method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {players:username} ) 
            }
        )
        const userData = await userResponse.json();
        return(userData)
    }

    // Go though all users in game and assign achivements to them
    for (const username of listUsernames) {
        const achievements = await fetchAchievements(username)
        console.log("achivements", achievements)
        const userMatches = await fetchMatches(username)
        console.log("userMatches", userMatches)
        const achivementLength = achievements.length

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
            if (userMatches.length >= 5) {
                achievements.push("3")
            }
        }
        if(!achievements.includes("4")) {
            // Play your 10 games
            if (userMatches.length >= 10) {
                achievements.push("4")
            }
        }
        if(!achievements.includes("5")) {
            // Play your 50 games
            if (userMatches.length >= 50) {
                achievements.push("5")
            }
        }
        // 6 and 7 are number of won games
        if(!achievements.includes("7")) {
            const numberWonGames = userMatches.filter((match) => {
                    const self = (match.players.find((player) => player.name == username))
                    if (self !== undefined){
                        return (self.won)
                    }
                }).length
            
            // Win first
            if(!achievements.includes("6")) {
                if (numberWonGames >= 1) {
                    achievements.push("6")
                }
            }
            // Win 10
            if (numberWonGames >= 10) {
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
                if (gameTypes.length >= 10) {
                    achievements.push("8")
                }
            }
            
            // Play 10 differnet
            if (gameTypes.length >= 10) {
                achievements.push("8")
            }
        }
        //Win 5 different matches of the same game
        if(!achievements.includes("10")) {
            const wonGames = userMatches.filter((match) => {
                    const self = (match.players.find((player) => player.name == username))
                    if (self !== undefined){
                        return (self.won)
                    }
                })
            
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

        // send updates to server
        if (achievements.length != achivementLength) {
            // a new achivement was added so send it if user exists
            console.log(username, achievements)
            
            const doesUserExistResponse = await fetch("/getUserByName", 
                {method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {username} ) 
                }
            )
            const userExists = await doesUserExistResponse.json();

            if (userExists != null) {
                //TODO: update userData.achievements with the naming scheme implemented when creating users
                // This will currenlty just cause a crash because there is no achievements field in user, this is why all todos need to be updated once create/account exists 
                const userResponse = await fetch("/modifyUser", 
                    {method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( {"achievements":achievements} ) 
                    }
                )
                // I don't think we care about the response if it is not an error
                const userData = await userResponse.json();
            }
        }
    }
    //return
}
export default AwardAchievementsFunction;
