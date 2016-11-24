//require('./stylesheets/app.scss');
//require('./stylesheets/bootstrap.scss');

import './stylesheets/bootstrap.scss'
import './stylesheets/app.scss'
import React from 'react'
import { render } from 'react-dom'

import App from './app'

const root = document.getElementById('stage');

render ((<App />), root );