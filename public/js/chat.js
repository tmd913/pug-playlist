//  Citation: This file was built using the tutorial found at https://socket.io/docs/#Using-with-Express
// as well as the github repo at https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js and modified to meet the needs of our application.


$.get('/credentials', function (data) {
    console.log(data);
    var FADE_TIME = 550; // ms
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
            // console.log(socket.emit('add user', username));
            socket.emit('add user', username);
        }
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
    }

    // Adds the visual chat message to the message list
    function addChatMessage(data, options) {
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));

        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
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

    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        log(data.username + ' left');
        addParticipantsMessage(data);
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