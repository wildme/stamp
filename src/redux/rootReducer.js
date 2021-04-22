import { LOGIN, LOGOUT } from './actionTypes';

const initialState = { user: null };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user } = action.payload;
            return { ...state, user };
        }
        case LOGOUT: {
            const { user } = action.payload;
            return { ...state, user };
        }
        default:
            return state;
    }
}

export default rootReducer;     
