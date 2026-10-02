import { Link } from "react-router-dom";

function Topbar({ user, setUser }) {
    const logout = async () => {
        await fetch("/auth/logout", { method: "POST" })
        setUser(null)
    }

    return (
        <>
            <style>{`
                nav {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                }

                nav input[type="search"] {
                    flex: 1;
                }

                nav .profile {
                    margin-left: auto;
                }
            `}</style>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
                <input type="search" placeholder="Search" />
                {user
                    ? <>
                        <Link className="profile" to="/profile">Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                    : <Link className="profile" to="/login">SignUp/SignIn</Link>}
            </nav>
        </>
    )
}
export default Topbar;
