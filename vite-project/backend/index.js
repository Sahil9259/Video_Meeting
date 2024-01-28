const { Server } = require("socket.io");
const express = require('express');

const app = express();
// const PORT = 8000;
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port 8000`);
// });

const io = new Server(8000, {
  cors: true,
});


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
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
// const { Server } = require("socket.io");
// const express = require('express');

// const app = express();
// const server = app.listen(process.env.PORT || 8000, () => {
//   console.log(`Server is running on port ${server.address().port}`);
// });
// app.use((req, res, next) => {
//   res.header('Content-Type', 'application/javascript');
//   next();
// });

// const io = new Server(server, {
//   cors: true,
// });

// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();

// app.get("/", (req, res) => {
//   res.send('Server is Running.');
// });

// io.on("connection", (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);
  
//   socket.on("room:join", (data) => {
//     const { email, room } = data;
//     emailToSocketIdMap.set(email, socket.id);
//     socketidToEmailMap.set(socket.id, email);
//     io.to(room).emit("user:joined", { email, id: socket.id });
//     socket.join(room);
//     io.to(socket.id).emit("room:join", data);
//   });

//   socket.on("user:call", ({ to, offer }) => {
//     io.to(to).emit("incoming:call", { from: socket.id, offer });
//   });

//   socket.on("call:accepted", ({ to, ans }) => {
//     io.to(to).emit("call:accepted", { from: socket.id, ans });
//   });

//   socket.on("peer:nego:needed", ({ to, offer }) => {
//     console.log("peer:nego:needed", offer);
//     io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
//   });

//   socket.on("peer:nego:done", ({ to, ans }) => {
//     console.log("peer:nego:done", ans);
//     io.to(to).emit("peer:nego:final", { from: socket.id, ans });
//   });
// });
