// routes.jsx
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/Layout'
import Home from './components/Home'
import Splash from './components/Splash'
import Pokemon from './components/Pokemon'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/splash" component={Splash} />
    <Route path="/pokemon/:pokemonName" component={Pokemon} />
  </Route>
);