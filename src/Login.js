export default function Login() {
    return (
        <div className="Login">
          <div className="LoginForm">
            <label for="user"><b>Username</b></label>
            <input type="text" placeholder="Enter Username"  id="user" name="user"/>
            <label for="pass"><b>Password</b></label>
            <input type="password" placeholder="Enter Password"id="pass" name="pass"/>
            <button type="submit" id="submit">Login</button>
          </div>
        </div>
    );
}
