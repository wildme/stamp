const initialState = { user: { loggedIn: false }, token: null, info: null };

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
      const { user, token, info } = action.payload;
      return { ...state, user, token, info };
    }
    case 'INFO': {
      const { info } = action.payload;
      return { ...state, info };
    }
    default: return state;
  }
};

export default rootReducer;
