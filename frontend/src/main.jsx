import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client'
import "./styles/index.scss";
import App from "./components/App";
/* import reportWebVitals from './reportWebVitals'; */

//Redux
import { Provider } from "react-redux";
//import { applyMiddleware, createStore } from "redux";
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// import thunk from "redux-thunk";
// import { default as thunk } from 'redux-thunk';
// import {thunk} from 'redux-thunk';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions.jsx";

//Redux dev tools
// import { composeWithDevTools } from "redux-devtools-extension";

/* import logger from 'redux-logger'; */


// Création du store Redux
// const store = createStore(
//   rootReducer(applyMiddleware(thunk /* , logger */))
// );
const store = createStore(
  rootReducer, // <-- pas de parenthèses !
  composeWithDevTools(applyMiddleware(thunk))
);

// Action init
store.dispatch(getUsers());

console.log("ENV TEST :", import.meta.env.VITE_API_URL);

// Injection dans le DOM
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals(); */
