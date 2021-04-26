import './App.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const HeaderLinks = () => {
    return  (
        <div className="navbar">
            <NavLink to="/inbox">Inbox</NavLink> 
            <NavLink to="/outbox">Outbox</NavLink>
                <div className="navbar-right">
                    <NavLink to="/logout">Logout</NavLink>
                </div>
        </div>
    );
}
const HeaderBlank = () => {
    return (
        <div className="navbar">
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
