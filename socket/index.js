const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users = [];

const addUser = (data,socketId) => {
    !users.some((user) => user.data.mittenteEmail === data.mittenteEmail) &&
        users.push({data,socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userEmail) => {
    return users.find((user) => user.data.mittenteEmail === userEmail)
}

io.on("connection",(socket) => {
    console.log("a user connected")
    socket.on("addUser",(data)=>{
        addUser(data,socket.id)
        io.emit("getUsers",users)
    })

    socket.on("sendMessage",({senderEmail,receiverEmail,text})=>{
        const user = getUser(receiverEmail)
        if(user) {
            console.log(user)
            io.to(user.socketId).emit("getMessage", {
                senderEmail,
                text,
                data
            })
        }
    })

    socket.on("disconnect",() => {
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})