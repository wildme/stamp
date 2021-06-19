import {
  LOGIN,
  LOGOUT,
  INBOX_ADD,
  INBOX_EDIT,
  OUTBOX_ADD,
  OUTBOX_EDIT,
} from './actionTypes';

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
        inbox: [...state.inbox, { id, ...content }],
      };
    }
    case INBOX_EDIT: {
      const { id, content } = action.payload;
      const idx = state.inbox.findIndex((x) => x.id == id);
      state.inbox[idx] = { ...state.inbox[idx], ...content };
      return { ...state };
    }
    case OUTBOX_ADD: {
      const { id, content } = action.payload;
      return {
        ...state,
        outbox: [...state.outbox, { id, ...content }],
      };
    }
    case OUTBOX_EDIT: {
      const { id, content } = action.payload;
      const idx = state.outbox.findIndex((x) => x.id == id);
      state.outbox[idx] = { ...state.outbox[idx], ...content };
      return { ...state };
    }
    default:
      return state;
  }
};

export default rootReducer;
