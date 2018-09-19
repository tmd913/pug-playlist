function handleJoin(chatroomName, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` })
  
    handleEvent(chatroomName, createEntry)
      .then(function (chatroom) {
        // add member to chatroom
        chatroom.addUser(client)
  
        // send chat history to client
        callback(null, chatroom.getChatHistory())
      })
      .catch(callback)
  }