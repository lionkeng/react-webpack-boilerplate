require('./stylesheets/app.scss');
require('./stylesheets/bootstrap.scss');

var component = require('./components/MyComponent');

document.body.appendChild(component());
