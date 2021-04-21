import {LOGIN, LOGOUT} from './actionTypes';

const initialState = { user: null };

const  login = (state, action) => {
    state.user = action.payload;
}

const logout = (state) => {
    state.user = null;
}

export login, logout;
