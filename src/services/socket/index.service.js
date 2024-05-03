

const configureSockets = (io, socket) => {
    return {
        message: (message) => {
            io.emit("message", message);
        },
        notification: (notification) => {
            io.emit("notification", notification);
        },
        tracking: (tracking) => {
            io.emit("tracking", tracking);
        },
    };
};
const onConnection = (io) => (socket) => {
    console.log("New connection established");

    const { message, notification, tracking } = configureSockets(io, socket);

    socket.on("message", message);
    socket.on("notification", notification);
    socket.on("tracking", tracking);

    socket.on("disconnect", () => {
        console.log("Connection disconnected");
    });
};