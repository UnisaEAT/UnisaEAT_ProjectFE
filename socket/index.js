const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

let users = []

const addUser = (data, socketId) => {
  !users.some((user) => user.data.mittenteEmail === data.mittenteEmail) &&
        users.push({ data, socketId })
}

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userEmail) => {
  return users.find((user) => user.data.mittenteEmail === userEmail)
}

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('addUser', (data) => {
    addUser(data, socket.id)
    io.emit('getUsers', users)
  })

  socket.on('sendMessage', ({ id, conversazioneId, senderEmail, receiverEmail, text }) => {
    const user = getUser(receiverEmail)
    if (user) {
      console.log(user)
      io.to(user.socketId).emit('getMessage', {
        id,
        conversazioneId,
        senderEmail,
        text
      })
    }
  })

  socket.on('deleteMessage', ({ senderEmail, receiverEmail, conversazioneId, id }) => {
    const user = getUser(receiverEmail)
    if (user) {
      io.to(user.socketId).emit('getDeletedMessage', {
        senderEmail,
        receiverEmail,
        conversazioneId,
        id
      })
    }
  })

  socket.on('modifyMessage', ({ senderEmail, receiverEmail, conversazioneId, id, testo }) => {
    const user = getUser(receiverEmail)

    if (user) {
      io.to(user.socketId).emit('getModifiedMessage', {
        senderEmail,
        receiverEmail,
        conversazioneId,
        id,
        testo
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})
