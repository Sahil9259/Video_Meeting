const { Server } = require("socket.io");
const app = require('express')();

const io = new Server(8000, {
  cors: true,
});
// const PORT = process.env.PORT || 8000;

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// app.get("/",(req,res)=>{
//   res.send('Server is Running.');
// });

// const app = require('express')();
// const server = require("http").createServer(app);
// const cors = require('cors');
// app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send('Server is Running.');
});

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
// Server.listen(PORT, () =>console.log(`Server listening on port ${PORT}`));
// server.listen(PORT, () =>console.log(`Server listening on port ${PORT}`));