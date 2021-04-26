import { connect } from 'react-redux';

const Hello = ({user}) => {
    return (<h1>Hello, {user.name}</h1>);
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}
export default connect(mapStateToProps )(Hello);
