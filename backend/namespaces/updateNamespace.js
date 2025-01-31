const connectedSockets = new Map();

const setupUpdateNamespace = (io) => {
    const updateNameSpace = io.of("/update");

const connectedSockets = new Map();

updateNameSpace.on("connection", (socket) => {
    socket.userData = {
        position: { x: 0, y: -500, z: -500 },
        quaternion: { x: 0, y: 0, z: 0, w: 0 },
        animation: "idle",
        name: "",
        avatarSkin: "",
    };
    connectedSockets.set(socket.id, socket);

    console.log(`${socket.id} has connected to update namespace`);

    socket.on("setID", () => {
        updateNameSpace.emit("setID", socket.id);
    });

    socket.on("setName", (name) => {
        socket.userData.name = name;
    });

    socket.on("setAvatar", (avatarSkin) => {
        // console.log("setting avatar " + avatarSkin);
        console.log(avatarSkin)
        updateNameSpace.emit("setAvatarSkin", avatarSkin, socket.id);
    });

    socket.on("authenticated", (user) => {
        console.log("User authenticated:", user);
        showMainUI(user.name);
    });
    
    socket.on("unauthorized", () => {
        console.error("Authentication failed");
        localStorage.removeItem("token");
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} has disconnected`);
        connectedSockets.delete(socket.id);
        updateNameSpace.emit("removePlayer", socket.id);
    });

    socket.on("initPlayer", (player) => {
        // console.log(player);
    });

    socket.on("updatePlayer", (player) => {
        socket.userData.position.x = player.position.x;
        socket.userData.position.y = player.position.y;
        socket.userData.position.z = player.position.z;
        socket.userData.quaternion.x = player.quaternion[0];
        socket.userData.quaternion.y = player.quaternion[1];
        socket.userData.quaternion.z = player.quaternion[2];
        socket.userData.quaternion.w = player.quaternion[3];
        socket.userData.animation = player.animation;
        socket.userData.avatarSkin = player.avatarSkin;
    });

    setInterval(() => {
        const playerData = [];
        for (const socket of connectedSockets.values()) {
            if (
                socket.userData.name !== "" &&
                socket.userData.avatarSkin !== ""
            ) {
                playerData.push({
                    id: socket.id,
                    name: socket.userData.name,
                    position_x: socket.userData.position.x,
                    position_y: socket.userData.position.y,
                    position_z: socket.userData.position.z,
                    quaternion_x: socket.userData.quaternion.x,
                    quaternion_y: socket.userData.quaternion.y,
                    quaternion_z: socket.userData.quaternion.z,
                    quaternion_w: socket.userData.quaternion.w,
                    animation: socket.userData.animation,
                    avatarSkin: socket.userData.avatarSkin,
                });
            }
        }

        if (socket.userData.name === "" || socket.userData.avatarSkin === "") {
            return;
        } else {
            updateNameSpace.emit("playerData", playerData);
        }
    }, 20);
});
};

export default setupUpdateNamespace;
