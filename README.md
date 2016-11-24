# react-webpack-boilerplate
Simple React-Webpack Boilerplate



For the production build, you will find everything for the client app in the `build` directory. To get routing to work, you will need to launch a server component to respond to different URL requests to the routes your app supports. Run the following from your project's root directory:

```
node app/server.js
```

The server will listen to port 5050. Make your web server (Nginx or Apache) do a reverse proxy from a URI that you will use to that port.

Here is a sample configuration for Apache. The following snippet will be included within your VirtualHost config.
```
   ProxyRequests off
     <Proxy *>
        Order deny,allow
        Allow from all
     </Proxy>
     <Location /MyApp>
         ProxyPass http://localhost:5050
         ProxyPassReverse http://localhost:5050
     </Location>

```
