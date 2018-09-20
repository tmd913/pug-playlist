/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
var express = require('express'); // Express web server framework

const PORT = process.env.PORT || 3000;

const AppConfig = require('./config/app');
const AuthConfig = require('./config/auth');

var client_id = AuthConfig.CLIENT_ID; // Your client id
var client_secret = AuthConfig.CLIENT_SECRET; // Your secret
var redirect_uri = `${AppConfig.HOST}/callback`; // Your redirect uri

var app = express();

require('./routing/auth')(app, express, client_id, client_secret, redirect_uri);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Listening on http://localhost: ${PORT}`);
});

