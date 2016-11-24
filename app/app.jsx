// App.jsx
import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://graphql-pokemon.now.sh/'   
})

const client = new ApolloClient({ networkInterface })

const App = (props, context) =>
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ApolloProvider>

export default App