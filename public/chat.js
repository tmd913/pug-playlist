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
    var $events = $('.events'); // The events box

    // Prompt for setting a username
    var username;
    var typing = false;
    var lastTypingTime;
    var connected = false;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    function addParticipantsMessage(data) {
        var message = '';
        if (data.numUsers === 1) {
            message += "1 active user";
        } else {
            message += data.numUsers + " active users";
        }
        log(message);
    }

    // Sets the client's username
    function setUsername() {
        username = cleanInput($usernameInput.val().trim() + ": ");

        // If the username is valid
        if (username) {
            $usernamePage.fadeOut();
            $playlist.removeClass("display-none");
            $events.removeClass("display-none");
            $playlist.show();
            $usernamePage.off('click');
            $currentInput = $searchBar.focus();

            // Tell the server your username
            console.log(socket.emit('add user', username));
            socket.emit('add user', username);
        }
    }

    function loadPlaylistQueue(){

    }

    // Sends a chat message
    function sendSong() {
        var message = $searchBar.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            $searchBar.val('');
            addChatMessage({
                username: username,
                message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }

    // Log a message
    function log(message, options) {
        var $el = $('<div>').addClass('log').text(message);
        $el.hide().fadeIn(FADE_TIME);
        $events.append($el);
        $events[0].scrollTop = $events[0].scrollHeight;
        // addMessageElement($el, options);
    }

    // Adds the visual chat message to the message list
    function addChatMessage(data, options) {
        // Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }

        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }

    // Adds the visual chat typing message
    function addChatTyping(data) {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    // Removes the visual chat typing message
    function removeChatTyping(data) {
        getTypingMessages(data).fadeOut(function () {
            $(this).remove();
        });
    }

    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    function addMessageElement(el, options) {
        var $el = $(el);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $playlistQueue.prepend($el);
        } else {
            $playlistQueue.append($el);
        }
        $playlistQueue[0].scrollTop = $playlistQueue[0].scrollHeight;
    }

    // Prevents input from having injected markup
    function cleanInput(input) {
        return $('<div/>').text(input).html();
    }

    // Updates the typing event
    function updateTyping() {
        if (connected) {
            if (!typing) {
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(() => {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Gets the 'X is typing' messages of a user
    function getTypingMessages(data) {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    }

    // Gets the color of a username through our hash function
    function getUsernameColor(username) {
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
        if (event.which === 13) {
            if (username) {
                sendSong();
                socket.emit('stop typing');
                typing = false;
            } else {
                setUsername();
            }
        }
    });

    $searchBar.on('input', () => {
        updateTyping();
    });

    // Click events

    // Focus input when clicking anywhere on login page
    $usernamePage.click(() => {
        $currentInput.focus();
    });

    // Focus input when clicking on the message input's border
    $searchBar.click(() => {
        $searchBar.focus();
    });

    // Socket events

    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
        connected = true;
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', (data) => {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
        log(data.username + ' joined');
        addParticipantsMessage(data);
        loadPlaylistQueue();
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        log(data.username + ' left');
        addParticipantsMessage(data);
        removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    socket.on('typing', (data) => {
        addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    socket.on('stop typing', (data) => {
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

// $(function () {
//     var FADE_TIME = 550; // ms
//     var TYPING_TIMER_LENGTH = 400; // ms
//     var COLORS = [
//         '#001f3f ', '#0074D9', '#7FDBFF', '#39CCCC',
//         '#7FDBFF', '#GREEN', '#7FDBFF', '#01FF70',
//         '#FF851B', '#FF4136', '#F012BE', '#B10DC9'
//     ];

//     // Initialize variables
//     var $window = $(window);
//     var $usernameInput = $('.usernameInput'); // Input for username
//     var $playlistHistory = $('.playlistHistory'); // where songs that have already been played are display 
//     var $playlistCurrent = $('.playlistCurrent'); // where the current song is displayed
//     var $playlistQueue = $('.playlistQueue'); // where new songs are added
//     var $searchBar = $('.searchBar'); // Input message input box

//     var $usernamePage = $('.usernamePage'); // The page where the user enters display name
//     var $playlist = $('.playlist'); // The playlist page
//     var $events = $('.events'); // The events box

//     // Prompt for setting a username
//     var username;
//     var connected = false;
//     var $currentInput = $usernameInput.focus();

//     var socket = io();

//     function addParticipantsMessage(data) {
//         var message = '';
//         if (data.numUsers === 1) {
//             message += "There is 1 user monitoring this playlist";
//         } else {
//             message += "There are " + data.numUsers + " people monitoring this playlist";
//         }
//         $("#users").text(message);
//     }

//     // Sets the client's username
//     function setUsername() {
//         username = cleanInput($usernameInput.val().trim() + ": ");
//         // If the username is valid
//         if (username) {
//             $usernamePage.fadeOut();
//             $playlist.removeClass("display-none");
//             $events.removeClass("display-none");
//             $playlist.show();
//             $usernamePage.off('click');
//             $currentInput = $searchBar.focus();

//             // Tell the server your username
//             console.log(socket.emit('add user', username));
//             socket.emit('add user', username);
//         }
//     }

//     // Sends a chat message
//     function addSong() {
//         var song = $searchBar.val();
//         // Prevent markup from being injected into the message
//         song = cleanInput(song);
//         if (song && connected) {
//             $playlistQueue.val('');
//             addSongInfo({
//                 username: username,
//                 song: song
//             });
//             console.log(socket.emit('new song', song));
//             socket.emit('new song', song);
//         }
//     }

//     // Log a message
//     function log(message) {
//         var $el = $('<div>').addClass('log').text(message);


//         $el.hide().fadeIn(FADE_TIME);
//         $events.append($el);
//         $events[0].scrollTop = $events[0].scrollHeight;
//     }

//     // Adds the visual chat message to the message list
//     function addSongInfo(data) {

//         var $usernameDiv = $('<span class="username"/>')
//             .text(data.username)
//             .css('color', getUsernameColor(data.username));
//         var $songBodyDiv = $('<span class="songBody">')
//             .text(data.song);
//         // THIS WILL BE THE JSON OBJECT FOR THE NEXT SONG

//         var $songDiv = $('<div class="playlist-queue"/>')
//             .data('username', data.username)
//             .append($usernameDiv, $songBodyDiv);

//         addSongElement($songDiv);
//     }

//     function addSongMessage(data) {
//         // Don't fade the message in if there is an 'X was typing'
//         var $typingMessages = getSongMessages(data);
//             options.fade = false;
//             $typingMessages.remove();
//     }

//     function getSongMessages(data)  {
//         return $('.typing.message').filter(function (i) {
//             return $(this).data('username') === data.username;
//         });
//     }

//     // Adds a message element to the messages and scrolls to the bottom
//     // el - The element to add as a message

//     function addSongElement(el) {
//         var $el = $(el);

//         $el.hide().fadeIn(FADE_TIME);
//         $playlistQueue.append($el);
//         $playlistQueue[0].scrollTop = $playlistQueue[0].scrollHeight;
//     }



//     // // Prevents input from having injected markup
//     function cleanInput(input) {
//         return $('<div/>').text(input).html();
//     }




//     // Gets the color of a username through our hash function
//     const getUsernameColor = (username) => {
//         // Compute hash code
//         var hash = 7;
//         for (var i = 0; i < username.length; i++) {
//             hash = username.charCodeAt(i) + (hash << 5) - hash;
//         }
//         // Calculate color
//         var index = Math.abs(hash % COLORS.length);
//         return COLORS[index];
//     }

//     // Keyboard events

//     $window.keydown(event => {
//         // Auto-focus the current input when a key is typed
//         if (!(event.ctrlKey || event.metaKey || event.altKey)) {
//             $currentInput.focus();
//         }
//         // When the client hits ENTER on their keyboard
//         if (event.which === 13) {
//             if (username) {
//                 addSong();
//                 socket.emit('stop typing');
//             } else {
//                 setUsername();
//             }
//         }
//     });


//     // Click events

//     // Focus input when clicking anywhere on login page
//     $usernamePage.click(() => {
//         $currentInput.focus();
//     });

//     // Focus input when clicking on the message input's border
//     $playlistQueue.click(() => {
//         $playlistQueue.focus();
//     });

//     $playlistCurrent.click(() => {
//         $playlistCurrent.focus();
//     });

//     $playlistHistory.click(() => {
//         $playlistHistory.focus();
//     });
//     // Socket events

//     // Whenever the server emits 'login', log the login message
//     socket.on('login', (data) => {
//         connected = true;

//         addParticipantsMessage(data);
//     });

//     // Whenever the server emits 'new message', update the chat body
//     socket.on('new song', (data) => {
//         addSongElement(data);
//     });

//     // Whenever the server emits 'user joined', log it in the chat body
//     socket.on('user joined', (data) => {
//         log(data.username + ' joined');
//         addParticipantsMessage(data);
//     });

//     // Whenever the server emits 'user left', log it in the chat body
//     socket.on('user left', (data) => {
//         log(data.username + ' left');
//         addParticipantsMessage(data);
//         // removeChatTyping(data);
//     });

//     socket.on('disconnect', () => {
//         log('you have been disconnected');
//     });

//     socket.on('reconnect', () => {
//         log('you have been reconnected');
//         if (username) {
//             socket.emit('add user', username);
//         }
//     });

//     socket.on('reconnect_error', () => {
//         log('attempt to reconnect has failed');
//     });




// });