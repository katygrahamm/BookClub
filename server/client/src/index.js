import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import thunk from "redux-thunk";
import { render } from "react-dom";
import React from 'react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import SignUp from './components/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css'


const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/home" component={Home} />
          </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
