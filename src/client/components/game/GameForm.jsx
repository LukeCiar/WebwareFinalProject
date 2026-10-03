
const GameForm = () => {
    const tags = [ //TODO put this somewhere else and import it here?
        "Cooperative", "Competitive",
        "<15 min", "15-30 min", "30-60 min", "60-120 min", "120+ min",
        "Party", "Trick-taking"
    ]

    const handleSubmit = async (formData) => {
        const gameData = {
            name: formData.get("name"),
            description: formData.get("description"),
            tags: formData.getAll("tags")
        }
        await fetch("/addGame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameData)
        })   
    }
    
    //TODO: remove inline styles (just here to break up the lines a bit)
    return (
    <>
        <form action={handleSubmit}>
            <label style={{display: "block"}}>
                Name
                <input type="text" name="name" />
            </label>

            <label style={{display: "block"}}>
                Description
                <textarea name="description"></textarea>
            </label>
            
            {tags.map(tag => (
                <label>
                    {tag}
                    <input type="checkbox" name="tags" value={tag} key={tag} />
                </label>
            ))}

            <input type="submit" value="Submit Game" style={{display: "block"}} />
        </form>
    </>
    )
}

export default GameForm