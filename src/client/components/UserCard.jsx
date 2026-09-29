function UserCard({user, winner = false}) {
    return (
        <tr>
            <td><img src={user.profilePicture} alt={user.username+"'s profile picture"} /></td>
            <td>{user.username}</td>
            <td>{winner && ("Winner")}</td>
        </tr>
    )
}
export default UserCard;
