import { useState, useEffect } from "react"
import MatchCard from "./MatchCard"

function MatchList({ matches }) {
    return (
        <section>
            <h2>Recent Matches</h2>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Date Played</th>
                        <th>Players</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((m) => <MatchCard key = {m._id} match={m} />)}
                </tbody> 
            </table>
        </section>
    )
}

export default MatchList