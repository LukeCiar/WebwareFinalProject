import { Link } from "react-router-dom";

function Topbar() {
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
                <Link className="profile" to="/profile">Profile</Link>
            </nav>
        </>
    )
}
export default Topbar;
