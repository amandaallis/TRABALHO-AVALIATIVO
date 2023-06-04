const express = require("express");
const server = express();
const userRouter = require("./routes/user.js");
const port = 3000;

server.use(express.json());
server.use(userRouter.router);

server.listen(port, () => {
    console.log("Server is running on port ", port);
})
