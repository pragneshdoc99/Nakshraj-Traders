/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import Main from './main';
import Thanks from './common/thanks';
import AdminMain from './admin/main'
// import login from './login';
// import Header from './common/header';

const RouteContainer = props => (
  <TransitionGroup>
    <CSSTransition
      key={props.location.key}
      timeout={{ enter: 600, exit: 600 }}
      classNames="fade"
      unmountOnExit
    >
      {/* <BrowserRouter> */}
      <Switch location={props.location}>
        {/* <Route exact path="/" component={login} /> */}
        <Route exact path="/" component={AdminMain} />
        {/* <Route exact path="/header" component={Header} /> */}
        <Route exact path="/thanks" component={Thanks} />
      </Switch>
      {/* </BrowserRouter> */}
    </CSSTransition>
  </TransitionGroup>
);

export default withRouter(RouteContainer);
