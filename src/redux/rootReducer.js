const initialState = { user: 'empty', token: 'empty' };

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
      const { user, token } = action.payload;
      return { ...state, user, token };
    }
    default: return state;
  }
};

export default rootReducer;
