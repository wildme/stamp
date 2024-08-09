const initialState =  { user: null, info: null, settings: null, roles: null };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, user };
    }
    case 'LOGOUT': {
      const { user, info, settings, roles } = action.payload;
      return { ...state, user, info, settings, roles };
    }
    case 'INFO': {
      const { info } = action.payload;
      return { ...state, info };
    }
    case 'SETTINGS': {
      const { settings } = action.payload;
      return { ...state, settings };
    }
    case 'ROLES': {
      const { roles } = action.payload;
      return { ...state, roles };
    }
    default: return state;
  }
};

export default rootReducer;
