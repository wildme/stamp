import './App.css';
import { connect } from 'react-redux';

const HeaderLinks = () => {
    return  (
        <div className="navbar">
            <a href="/inbox">Inbox</a> 
            <a href="/outbox">Outbox</a>
                <div className="navbar-right">
                    <a href="/logout">Logout</a>
                </div>
        </div>
    );
}
const HeaderBlank = () => {
    return (
        <div className="navbar">
                <div className="navbar-right">
                </div>
        </div>
    );
}

const Header = ({user}) => {
    return user ? <HeaderLinks/> : <HeaderBlank/>
        
}
const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}

export default connect(mapStateToProps)(Header);
