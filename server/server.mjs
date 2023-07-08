import express from "express";
const app = express();
import cors from "cors";
import chess from 'chess';

app.use(express.json());
app.use(cors());

import http from "http";
import { Server } from "socket.io";

var games = {};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

var row_mapping = {
  0:8,1:7,2:6,3:5,4:4,5:3,6:2,7:1
}

var col_mapping = {
  0:'a',1:'b',2:'c',3:'d',4:'e',5:'f',6:'g',7:'h'
}

function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


io.on('connection', (socket) => {
  console.log("id", socket.id);
  socket.on('generateRoom', (callback) => {
    const roomId = generateUniqueId();
    socket.emit('generateRoom', roomId);
    callback(roomId);
  });

  socket.on('roomGenerated', (roomId) => {
    console.log('Generated Room ID:', roomId);
  });
  socket.on('join-room',(roomID)=>{
    const room = io.of("/").adapter.rooms;
  //  console.log("room:",room);
    //console.log("game",games[(roomID)]);
    if(games[roomID]===undefined){
     // console.log("yoyoyoyo");
      const gameClient = chess.create();
      games[roomID] = gameClient;
    }
    socket.join(roomID);
    io.to(roomID).emit("gameDetails",{gd:games[roomID].getStatus(),id:roomID});
  });
  socket.on('check', (xx) => {
    console.log(xx);
    const id = xx.roomID;
    const xsrc = col_mapping[xx.src.x], ysrc = row_mapping[xx.src.y], 
    xdest = col_mapping[xx.dest.x], ydest = row_mapping[xx.dest.y];
    console.log(xsrc,ysrc,xdest,ydest);
    const legalMoves = games[id].getStatus();
    const legal = legalMoves.notatedMoves;
  //  console.log(legal);
    for(let e1 in legal){
      let e = legal[e1];
    //  console.log(e.src.file);
      if(e.src.file===xsrc&&e.src.rank===ysrc&&e.dest.file===xdest&&e.dest.rank===ydest){
        console.log("yes legal");
        games[id].move(e1);
      }
    }
    io.to(id).emit("gameDetails",{gd:games[id].getStatus(),id:id});
  });
});



const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
