import './App.css';

export default function Footer() {
    return (
        <footer className="footer">
        <p>&copy; Stamp {(new Date()).getFullYear()}</p>
        </footer>
    );
}
