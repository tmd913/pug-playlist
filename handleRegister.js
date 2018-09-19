function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName))
      return callback('user is not available')
  
    const user = clientManager.getUserByName(userName)
    clientManager.registerClient(client, user)
  
    return callback(null, user)
  }