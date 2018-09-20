//  Citation: This file was built using the tutorial found at https://socket.io/docs/#Using-with-Express
// as well as the github repo at https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js and modified to meet the needs of our application.


$(function () {
            var FADE_TIME = 550; // ms
            var TYPING_TIMER_LENGTH = 400; // ms
            var COLORS = [
                '#001f3f ', '#0074D9', '#7FDBFF', '#39CCCC',
                '#7FDBFF', '#GREEN', '#7FDBFF', '#01FF70',
                '#FF851B', '#FF4136', '#F012BE', '#B10DC9'
            ];

            // Initialize variables
            var $window = $(window);
            var $usernameInput = $('.usernameInput'); // Input for username
            var $playlistHistory = $('.playlistHistory'); // where songs that have already been played are display 
            var $playlistCurrent = $('.playlistCurrent'); // where the current song is displayed
            var $playlistQueue = $('.playlistQueue'); // where new songs are added
            var $searchBar = $('.searchBar'); // Input message input box

            var $usernamePage = $('.usernamePage'); // The page where the user enters display name
            var $playlist = $('.playlist'); // The playlist page

            // Prompt for setting a username
            var username;
            var connected = false;
            var $currentInput = $usernameInput.focus();

            var socket = io();

            function addParticipantsMessage(data) {
                var message = '';
                if (data.numUsers === 1) {
                    message += "There is 1 user monitoring this playlist";
                } else {
                    message += "There are " + data.numUsers + " people monitoring this playlist";
                }
                $("#users").text(message);
            }

            // Sets the client's username
            function setUsername() {
                // username = cleanInput($usernameInput.val().trim() + ": ");
                username = $usernameInput.val().trim() + ": ";
                console.log(username);
                // If the username is valid
                if (username) {
                    $usernamePage.fadeOut();
                    $playlist.removeClass("display-none");
                    $playlist.show();
                    $usernamePage.off('click');
                    $currentInput = $searchBar.focus();

                    // Tell the server your username
                    socket.emit('add user', username);
                }
            }

            // Sends a chat message
            function addSong() {
                console.log("ran addSong");
                var song = $searchBar.val();
                // Prevent markup from being injected into the message
                // song = cleanInput(song);
                console.log(song);
                if (song && connected) {
                    $playlistQueue.val('');
                    addSongInfo({
                        username: username,
                        song: song
                    });

                    socket.emit('new song', song);
                    console.log("addSong");
                }}

                // Log a message
                function log(message) {
                    var $el = $('<div>').addClass('log').text(message);
                    addSongElement($el);
                }

                // Adds the visual chat message to the message list
                function addSongInfo(data) {

                    var $usernameDiv = $('<span class="username"/>')
                        .text(data.username)
                        .css('color', getUsernameColor(data.username));
                    var $songBodyDiv = $('<span class="songBody">')
                        .text(data.message);
                    // THIS WILL BE THE JSON OBJECT FOR THE NEXT SONG

                    var $messageDiv = $('<div class="playlist-queue"/>')
                        .data('username', data.username)
                        .append($usernameDiv, $songBodyDiv);

                    addSongElement($messageDiv);
                }

                // Adds a message element to the messages and scrolls to the bottom
                // el - The element to add as a message

                function addSongElement(el) {
                    var $el = $(el);

                        $el.hide().fadeIn(FADE_TIME);
                        $playlistQueue.append($el);
                    }
                    $playlistQueue[0].scrollTop = $playlistQueue[0].scrollHeight;
                

                // // Prevents input from having injected markup
                // function cleanInput(input) {
                //     return $('<div/>').text(input).html();
                // }




                // Gets the color of a username through our hash function
                const getUsernameColor = (username) => {
                    // Compute hash code
                    var hash = 7;
                    for (var i = 0; i < username.length; i++) {
                        hash = username.charCodeAt(i) + (hash << 5) - hash;
                    }
                    // Calculate color
                    var index = Math.abs(hash % COLORS.length);
                    return COLORS[index];
                }

                // Keyboard events

                $window.keydown(event => {
                    // Auto-focus the current input when a key is typed
                    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
                        $currentInput.focus();
                    }
                    // When the client hits ENTER on their keyboard
                    console.log("event ran");
                    if (event.which === 13) {
                        console.log("event ===13");
                        if (username) {
                            console.log("username is true");
                            addSong();
                            console.log("made it past addsong");
                            socket.emit('stop typing');
                        } else {
                            setUsername();
                        }
                    }
                });

    
                // Click events

                // Focus input when clicking anywhere on login page
                $usernamePage.click(() => {
                    $currentInput.focus();
                });

                // Focus input when clicking on the message input's border
                $playlistQueue.click(() => {
                    $playlistQueue.focus();
                });

                $playlistCurrent.click(() => {
                    $playlistCurrent.focus();
                });

                $playlistHistory.click(() => {
                    $playlistHistory.focus();
                });
                // Socket events

                // Whenever the server emits 'login', log the login message
                socket.on('login', (data) => {
                    connected = true;

                    addParticipantsMessage(data);
                });

                // Whenever the server emits 'new message', update the chat body
                socket.on('new song', (data) => {
                    addSong(data);
                });

                // Whenever the server emits 'user joined', log it in the chat body
                socket.on('user joined', (data) => {
                    log(data.username + ' joined');
                    addParticipantsMessage(data);
                });

                // Whenever the server emits 'user left', log it in the chat body
                socket.on('user left', (data) => {
                    log(data.username + ' left');
                    addParticipantsMessage(data);
                    removeChatTyping(data);
                });

                socket.on('disconnect', () => {
                    log('you have been disconnected');
                });

                socket.on('reconnect', () => {
                    log('you have been reconnected');
                    if (username) {
                        socket.emit('add user', username);
                    }
                });

                socket.on('reconnect_error', () => {
                    log('attempt to reconnect has failed');
                });
                
                

            
            });