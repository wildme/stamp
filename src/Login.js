import React, { useState } from 'react';
import { login } from './redux/actions.js';
import { connect } from 'react-redux';

const Login = ({dispatch}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            login({
            name: name,
            password: password,
            loggedIn: true
            })
        );
        setName("");
        setPassword("");
    };

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
            <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
        </div>
    );
}

export default connect()(Login);
