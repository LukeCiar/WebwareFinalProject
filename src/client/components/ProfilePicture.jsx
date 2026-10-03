function ProfilePicture({name, alttext}) {
    if (name == null || name == "") {
        name = "default"
    }
    if (alttext == null || alttext == "") {
        alttext = "Profile Picture"
    }
    return (
        <div style = {{backgroundColor: "#dc3545", width:"50px", height:"100px", position:"relative"}}>
            <img style = {{position:"relative"}} src={"../../../profilePictures/"+name+".png"} alt={alttext} width="50" height="100"/>
        </div>
    )
}
export default ProfilePicture;
