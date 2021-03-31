import './App.css';

export default function Header() {
    return (
        <div className="navbar">
           <a href="/inbox">Inbox</a> 
           <a href="/outbox">Outbox</a>
           <div class="navbar-right">
                <a href="/logout">Logout</a>
                <a href="/login">Login</a>
           </div>
            
        </div>
    );
}
    
