import { useState } from "react";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: not currently supported, no login endpoint yet
        console.log("This function has not been finished");
        console.log("Username:", username, "Password:", password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>

            <br />

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>

            <br />

            <button type="submit">Sign In</button>
        </form>
    )
}
export default LoginPage;
