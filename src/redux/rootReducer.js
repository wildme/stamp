const initialState = {
  user: { loggedIn: false },
  token: null,
  info: null,
  settings: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, user };
    }
    case 'TOKEN': {
      const { token } = action.payload;
      return { ...state, token };
    }
    case 'LOGOUT': {
      const { user, token, info, settings } = action.payload;
      return { ...state, user, token, info, settings };
    }
    case 'INFO': {
      const { info } = action.payload;
      return { ...state, info };
    }
    case 'SETTINGS': {
      const { settings } = action.payload;
      return { ...state, settings };
    }
    default: return state;
  }
};

export default rootReducer;
