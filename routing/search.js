// ***** not currently in use *****

var request = require('request'); // "Request" library
var path = require('path');
var SpotifyWebApi = require('spotify-web-api-node');

// var credentials = require('./auth');

// console.log(credentials);

module.exports = function (app, client_id, client_secret, redirect_uri, currentCredentials) {
    app.post('/search', function (req, res) {
        var access_token;

        app.get('/credentials', function (data) {
            access_token = data.access_token;

            // console.log(credentials);
            // console.log(currentCredentials);
            // var access_token = credentials.access_token;
            // credentials are optional
            var spotifyApi = new SpotifyWebApi({
                clientId: client_id,
                clientSecret: client_secret,
                redirectUri: redirect_uri
            });

            var tracks = [];

            spotifyApi.setAccessToken(access_token);

            spotifyApi.searchTracks(
                `track: ${req.body.name}`,
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
                            tracks.push(track);
                            track.artists.forEach(artist => {
                                console.log(artist.name);
                            });
                            console.log('--------');
                        });
                        res.json(tracks);
                    }
                }
            );
        });

        console.log(access_token);
    })
}



