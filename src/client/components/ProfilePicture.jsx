function ProfilePicture({name, alttext, width="50px", height="100px"}) {
    if (name == null || name === "none" || name === "") {
        name = "default"
    }
    if (alttext == null || alttext === "none" || alttext === "") {
        alttext = "Profile Picture"
    }
    return (
        <div style = {{backgroundColor: "#dc3545", width:`${width}`, height:`${height}`}} className = "d-inline-block align-items-center rounded me-2">
            <img style = {{position:"relative"}} src={"../../../profilePictures/"+name+".png"} alt={alttext} width={width} height={height}/>
        </div>
    )
}
export default ProfilePicture;
