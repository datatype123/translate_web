import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user/userSlice';
import {textReducer} from './text/textSlice';
// import thêm các reducer khác nếu có

const mainReducer = combineReducers({
    user:userReducer,
    text:textReducer
});

const rootReducers = (state: any, action: any) => {
  // reset store if logout
  if (action.type === 'app/logout') {
    // localStorage.removeItem(rememberMe);
    // localStorage.removeItem('persistWhitelist');

    state = {
      persistApp: state.persistApp,
      publicCms: state.publicCms,
    };
  }

  return mainReducer(state, action);
};




export default rootReducers;