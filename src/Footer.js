import './App.css';

export default function Footer() {
    return (
        <footer className="App-footer">
        &copy; Stamp {(new Date()).getFullYear()}
        </footer>
    );
}
