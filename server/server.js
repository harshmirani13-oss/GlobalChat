```javascript
const dns = require("dns");

const resolver = new dns.Resolver();

resolver.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

dns.promises.resolveSrv = resolver.resolveSrv.bind(resolver);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/database");

const app = express();


// ===============================
// DATABASE
// ===============================

connectDB();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// AUTH ROUTES
// ===============================

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);


// ===============================
// HTTP SERVER
// ===============================

const server = http.createServer(app);


// ===============================
// SOCKET.IO
// ===============================

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("🚀 Chat Server is Running!");
});


// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {

    console.log(`🟢 User Connected: ${socket.id}`);


    socket.on("disconnect", () => {

        console.log(`🔴 User Disconnected: ${socket.id}`);

    });

});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});
```
