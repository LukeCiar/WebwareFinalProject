import { useState, useEffect } from "react"
import MatchCard from "../components/MatchCard"

function HomePage() { 
    const [matches, setMatches] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch("/matches", {method: 'GET'})
            const data = await response.json()
            setMatches(data)
        }
        fetchMatches()
    }, [])

    return (
        <>
            <h2>Matches</h2>
            <table> <tbody>
                {matches.map((m) => <MatchCard key = {m._id} match={m} />)}
            </tbody> </table>
        </>
    )   
}
export default HomePage;
