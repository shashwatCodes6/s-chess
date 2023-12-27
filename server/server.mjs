import express from "express";
const app = express();
import cors from "cors";
import chess from 'chess';

app.use(express.json());
app.use(cors());

import http from "http";
import { Server } from "socket.io";

var games = {};
var boards = {};

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
var row_mapping1 = {
  0:8,1:7,2:6,3:5,4:4,5:3,6:2,7:1
}

var col_mapping1 = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7
}


const init_chess_board = [
  ['b_r8', 'b_n7', 'b_b6', 'b_q5', 'b_k4', 'b_b3', 'b_n2', 'b_r1'],
  ['b_p8', 'b_p7', 'b_p6', 'b_p5', 'b_p4', 'b_p3', 'b_p2', 'b_p1'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['w_p1', 'w_p2', 'w_p3', 'w_p4', 'w_p5', 'w_p6', 'w_p7', 'w_p8'],
  ['w_r1', 'w_n2', 'w_b3', 'w_q4', 'w_k5', 'w_b6', 'w_n7', 'w_r8']
]


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
    if(games[roomID]===undefined){
      const gameClient = chess.create();
      games[roomID] = gameClient;
      boards[roomID] = init_chess_board;
    }
    socket.join(roomID);
    io.to(roomID).emit("gameDetails",{gd:games[roomID].getStatus(),id:roomID});
  });
  socket.on('check', (xx) => {
    console.log("req", xx);
    const id = xx.roomID;
    const legalMoves = games[id].getStatus();
    const legal = legalMoves.notatedMoves;
    console.log(legal);
    let xsrc = col_mapping[xx.src.x], ysrc = row_mapping[xx.src.y], xdest = col_mapping[xx.dest.x], ydest = row_mapping[xx.dest.y];
    var move = {x:-1, xdes: -1, y:-1, ydes: -1, roomID: id, pid: null};
    for(let e1 in legal){
      let e = legal[e1];
    //  console.log(e.src.file);
      if(e.src.file===xsrc&&e.src.rank===ysrc&&e.dest.file===xdest&&e.dest.rank===ydest){
        move.x = xsrc, move.y = ysrc, move.xdes = xdest, move.ydes = ydest;
        games[id].move(e1);
        break;
      }
    }
    console.log(move);
    io.to(id).emit("gameDetails",move);
  //  io.to(id).emit("updateBoard",xx);
  });
});



const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
