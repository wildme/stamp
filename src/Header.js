import logo from './logo.jpg';
import './App.css';

export default function Header() {
    return (
        <header className="App-header">
            <img scr={logo} className="App-logo" alt="logo" />
                <nav>
                    <a href="#s">Inbox</a>
                    <a href="#s">Outbox</a>
                </nav> 
        </header>
    );
}
    
