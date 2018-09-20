var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var path = require('path');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = (app, express, client_id, client_secret, redirect_uri) => {
    /**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
    var generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    var stateKey = 'spotify_auth_state';

    app.use(express.static('public'))
        .use(cors())
        .use(cookieParser());

    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: redirect_uri
    });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });

    app.get('/login', function (req, res) {
        var state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        var scope = 'user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-recently-played user-top-read user-read-private user-read-email user-read-birthdate streaming app-remote-control user-modify-playback-state user-read-currently-playing user-read-playback-state user-follow-modify user-follow-read';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    });

    app.get('/callback', function (req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(stateKey);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log('-----------------');
                    console.log('Auth');
                    console.log('-----------------');
                    console.log(body);

                    var access_token = body.access_token;
                    var refresh_token = body.refresh_token;

                    spotifyApi.setAccessToken(access_token);

                    spotifyApi.searchTracks(
                        'track: be like you',
                        { limit: 10, offset: 0 },
                        function (err, data) {
                            if (err) {
                                console.error('Something went wrong!');
                            } else {
                                console.log('-----------------');
                                console.log('Tracks');
                                console.log('-----------------');
                                data.body.tracks.items.forEach(track => {
                                    console.log(track.name);
                                    track.artists.forEach(artist => {
                                        console.log(artist.name);
                                    });
                                    console.log('--------');
                                });
                            }
                        }
                    );

                    var options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, function (error, response, body) {
                        console.log('-----------------');
                        console.log('User');
                        console.log('-----------------');
                        console.log(body);
                        var user_id = body.id;

                        options = {
                            url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
                            headers: { 'Authorization': 'Bearer ' + access_token },
                            json: true
                        };

                        // use the access token to access the Spotify Web API
                        request.get(options, function (error, response, body) {
                            console.log('User Playlist');
                            console.log('-----------------');
                            console.log(body.items[0]);
                            console.log('-----------------');
                        });
                    });

                    // we can also pass the token to the browser to make requests from there
                    // res.redirect('/#' +
                    //   querystring.stringify({
                    //     access_token: access_token,
                    //     refresh_token: refresh_token
                    //   }));
                    res.redirect(path.join(__dirname, './public/user.html'));
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    });

    app.get('/user', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/user.html'));
    });

    app.get('/refresh_token', function (req, res) {

        // requesting access token from refresh token
        var refresh_token = req.query.refresh_token;
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                res.send({
                    'access_token': access_token
                });
            }
        });
    });
}

