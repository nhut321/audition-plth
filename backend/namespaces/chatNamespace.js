const setupChatNamespace = (io) => {
    const chatNameSpace = io.of("/chat");

    chatNameSpace.on("connection", (socket) => {
        socket.userData = { name: "" };

        console.log(`${socket.id} has connected to chat namespace`);

        socket.on("disconnect", () => {
            console.log(`${socket.id} has disconnected`);
        });

        socket.on("setName", (name) => {
            socket.userData.name = name;
        });

        socket.on("send-message", (message, time) => {
            socket.broadcast.emit(
                "recieved-message",
                socket.userData.name,
                message,
                time
            );
        });
    });
};

export default setupChatNamespace;
