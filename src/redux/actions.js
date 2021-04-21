import { LOGIN, LOGOUT } from './actionTypes';

export const login = (creds) => ({
    type: LOGIN,
    payload: { creds }
});

export const logout = (user) => ({
    type: LOGOUT,
    payload: { user: null }
});


