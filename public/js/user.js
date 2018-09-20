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

var params = getHashParams();

// var access_token = params.access_token;
var access_token = 'BQAM9d_G7o7enQBFKnFy4vJU0ocI0Uj6TEukwFB06vXVX-WL5ZS1nM6Z25PFA0SU6qT9NalkwKrsvwXoRLv0VApwX28nM5Oeme-limSYb7RlCugsPlhNAd3mU6wAjBQ6wPmiakW01-k8KlvGixamg61UftjpEKwJFy8kby_w4jpWmX11DIbkyY90oyKCOp2VP9R4sdyVIKYsON5VLLwWVmFwKOnKE-1rAthitlAxHopL8lbSpXYUXlhj9-AC2Z15N50P80gAaA9-zcniM20a_w769PI';
// var refresh_token = params.refresh_token;
var refresh_token = 'AQCTP1S90Oknra5YWuc8n-t9ihTOvu-sUN71L2ncfYXfBQEo-0IAv5a81YpvrrCocftTHT3rTZxSLodFwLQGSpYGuh6iG66ZsCQee34kO-spdoXXmPo24GDN11uO1oWgpVC0Ng';
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
}