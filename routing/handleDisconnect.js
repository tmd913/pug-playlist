function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
  }