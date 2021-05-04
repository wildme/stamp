import { LOGIN, LOGOUT, INBOX_ADD, OUTBOX_ADD } from './actionTypes';

let nextInboxID = 0;
let nextOutboxID = 0;

export const login = (user) => ({
    type: LOGIN,
    payload: { user }
});

export const logout = () => ({
    type: LOGOUT,
    payload: { user: null, inbox: [], outbox: [] }
});

export const inbox_add = (content) => ({
    type: INBOX_ADD,
    payload: { id: ++nextInboxID, content }
});

export const outbox_add = (content) => ({
    type: OUTBOX_ADD,
    payload: { id: ++nextOutboxID, content }
});
