// stage.jsx
import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
// import routes from './routes'

/*
const Stage = (props) =>
  <div id={"ReplaceWithHOCLikeReduxProvider"}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </div>
*/

const Stage = (props, context) => (
  <div>
    <h1>Hello World</h1>
  </div>
)

export default Stage;