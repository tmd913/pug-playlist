// ***** original version of browserify file *****

var SpotifyWebApi = require('spotify-web-api-js');

var spotify = new SpotifyWebApi();

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

var userProfilePlaceholder = $('#user-profile');
var oauthPlaceholder = $('#oauth');

$.get('/credentials', function (data) {
    var params = getHashParams();

    // var access_token = params.access_token;
    var access_token = data.accessToken;
    // var refresh_token = params.refresh_token;
    var refresh_token = data.refreshToken;

    var error = params.error;

    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {
            // render oauth info
            $("#access-token").text(access_token);
            $("#refresh-token").text(refresh_token);

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    $("#name").text(response.display_name);
                    $("#image").attr("src", response.images[0].url);
                    $("#display-name").text(response.display_name);
                    $("#id").text(response.id);
                    $("#email").text(response.email);
                    $("#uri").attr("href", response.uri);
                    $("#uri").text(response.uri);
                    $("#href").attr("href", response.href);;
                    $("#href").text(response.href);;
                    $("#image-link").attr("href", response.images[0].url);
                    $("#image-link").text(response.images[0].url);
                    $("#country").text(response.country);

                    // $('#login').hide();
                    // $('#loggedin').show();
                }
            });
        } else {
            // render initial screen
            // $('#login').show();
            // $('#loggedin').hide();
        }

        document.getElementById('obtain-new-token').addEventListener('click', function () {
            $.ajax({
                url: '/refresh_token',
                data: {
                    'refresh_token': refresh_token
                }
            }).done(function (data) {
                access_token = data.access_token;
                oauthPlaceholder.innerHTML = oauthTemplate({
                    access_token: access_token,
                    refresh_token: refresh_token
                });
            });
        }, false);

        $("#search-song").on("click", function () {
            var songName = $("#song-text").val();
            var track = {
                name: songName
            };

            console.log(songName);
            console.log(track);

            $.post('/search', track, function (data) {
                console.log(data);
                $("#search-results").text(data[0].name);
            });
        });
    }
});