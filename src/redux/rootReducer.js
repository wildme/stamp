import { LOGIN, LOGOUT, INBOX_ADD, OUTBOX_ADD } from './actionTypes';

const initialState = { user: null, inbox: [], outbox: [] };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user } = action.payload;
            return { ...state, user };
        }
        case LOGOUT: {
            const { user, inbox, outbox } = action.payload;
            return { ...state, user, inbox, outbox };
        }
        case INBOX_ADD: {
            const { id, content } = action.payload;
            return {
                ...state,
                inbox: [...state.inbox, {id, ...content }]
            }
        }
        default:
            return state;
    }
}

export default rootReducer;     
