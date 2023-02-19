const initialState =  { user: null, info: null, settings: null };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, user };
    }
    case 'LOGOUT': {
      const { user, info, settings } = action.payload;
      return { ...state, user, info, settings };
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
