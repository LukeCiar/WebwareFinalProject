import { Link } from "react-router-dom";

function Topbar({ user, setUser }) {
    const logout = async () => {
        await fetch("/auth/logout", { method: "POST" })
        setUser(null)
    }

    // TODO Get this data from the profile system
    let signedIn = true;
    let username = user.username

    let profileDropdown;
    if (signedIn) {
        profileDropdown = (<>
            <img src="/profile_pictures/test_pfp.png" alt="profile picture" width="40px" height="40px" className="d-inline-block align-items-center rounded me-2"/>
            {username}
        </>)
    } else {
        profileDropdown = (<>
            Not signed in
        </>)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary fixed-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Board Game Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/games" className="nav-link">Games</Link>
                        </li>
                        <li className="nav-item px-3">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search games and users..." aria-label="Search"/>
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </li>
                    </ul>
                    <span className="dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            {profileDropdown}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" to="/login" hidden={signedIn}>Log In/Sign Up</Link></li>
                            <li><Link className="dropdown-item" to="/profile" hidden={!signedIn}>Profile</Link></li>
                            <li><button className="dropdown-item" onClick={logout} hidden={!signedIn}>Log Out</Link></li>
                        </ul>
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Topbar;
