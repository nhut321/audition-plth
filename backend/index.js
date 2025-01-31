import createServer from "./server.js";

const { server, port } = createServer();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
