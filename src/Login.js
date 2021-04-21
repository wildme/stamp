import React, {useState} from 'react';

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="Login">
            <label for="user"><b>Username</b></label>
            <input
                type="text"
                placeholder="Enter Username"
                name="user"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label for="pass"><b>Password</b></label>
            <input
                type="password"
                placeholder="Enter Password"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </div>
    );
}
export default Login;
