// stage.jsx
import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

const Stage = (props) =>
  <div id={"ReplaceWithHOCLikeReduxProvider"}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </div>

export default Stage;