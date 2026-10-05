import ProfilePicture from "./profilePicture"

function UserCard({user, winner = false}) {
    console.log(user.profilePicture)
    return (
        <tr>
            <td><ProfilePicture name={user.profilePicture} alttext={user.username+"'s profile picture"} width="50px" height="50px"/></td>
            <td>{user.name}</td>
            <td>{winner && ("Winner")}</td>
        </tr>
    )
}
export default UserCard;
