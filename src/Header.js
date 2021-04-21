import './App.css';

export default function Header(props) {
    return (
        <div className="navbar">
            <a href="/inbox">Inbox</a> 
            <a href="/outbox">Outbox</a>
                <div className="navbar-right">
                    <a href="/logout">Logout</a>
                    <a href="/login">Login</a>
                </div>
        </div>
    );
}
