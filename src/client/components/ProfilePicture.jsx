function ProfilePicture({name, alttext, width="auto", height="100px"}) {
    if (name == null || name === "none" || name === "") {
        name = "default"
    }
    if (alttext == null || alttext === "none" || alttext === "") {
        alttext = "Profile Picture"
    }
    return (
        <div style = {{backgroundColor: "#dc3545", width:`${width}`, height:`${height}`}} className = "d-inline-block align-items-center rounded me-2 border border-3">
            <img style = {{position:"relative", height:"100%"}} src={"../../../profilePictures/"+name+".png"} alt={alttext} />
        </div>
    )
}
export default ProfilePicture;
