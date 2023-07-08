import React from 'react'
import { useState, useEffect } from 'react'
import { renderMatches } from 'react-router-dom';
import './App.css'
import { socket } from './socket';

var row_mapping = {
  0:8,1:7,2:6,3:5,4:4,5:3,6:2,7:1
}

var col_mapping = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7
}

class Board extends React.Component{
  render(){
    var c_b = this.props.c_b;
    return (
    c_b.map((row, rowIndex) => (
    <React.Fragment key={rowIndex}>
        {row.map((p, colIndex) => (
        <React.Fragment key={`${rowIndex}-${colIndex}`}>
            {p !== '-' ? (
            <img
                src={`/src/assets/pieces/${p[0]+p[1]+p[2]}.png`}
                style={{
                width: '60px',
                height: '60px',
                left: `${colIndex * 60}px`,
                top: `${rowIndex * 60}px`,
                position: 'absolute',
                }}
                id = {p}
                name = {p}
            />
            ) : (
            <img />
            )}
        </React.Fragment>
        ))}
    </React.Fragment>
    ))
  );
  }
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

function App(props) {
  const roomID = props.id;
  var [chess_board,setBoard] = useState(init_chess_board);

  useEffect(()=>{
    socket.on("gameDetails",(x)=>{
      if(x.id===roomID){
       // console.log("from room",x);
        var st = x.gd.board.squares;
        console.log(st);
        let i = 0;
        var chess_board1 = init_chess_board;
        for( let e1 in st){ 
          let e = st[e1];
       //   console.log(e1);
          if(e.piece!==null){
            // console.log(e.piece);
            if(e.piece.type==='knight')
              chess_board1[8-e.rank][col_mapping[e.file]]=e.piece.side.name[0] + "_" + e.piece.type[1];
            else
              chess_board1[8-e.rank][col_mapping[e.file]]=e.piece.side.name[0] + "_" + e.piece.type[0];
          }else {
            chess_board1[8-e.rank][col_mapping[e.file]] = '-';
          }
        }
        setBoard(chess_board1);
        console.log(chess_board1);
      }
    });
    // socket.on("checkLegal",(move)=>{
    //   console.log("kya",move);
    //   socket.emit("check",move);
    // });

  },[]); 
  function detectClick(event) {
    const element = document.querySelector("#c_board");
    element.removeEventListener("click",detectClick,false);
    var x = Math.floor((event.pageX-event.currentTarget.offsetLeft)/60),
    y = Math.floor((event.pageY-event.currentTarget.offsetTop)/60);
    if(!(chess_board[y][x]==='-')){
      document.querySelector("#c_board").removeEventListener("click",detectClick,false);
      func({x:x,y:y});
      document.querySelector("#c_board").addEventListener("click",detectClick,false);
    }
  }
  // function func2(y1){
  //   socket.emit("move",y1);
  // }

  const func = (coords) => {
    //console.log(piece_id);
    console.log(coords);
    var container = document.querySelector("#c_board");
    container.addEventListener("click", boardClick, false);
    function boardClick(event){
      var x = Math.floor((event.pageX-event.currentTarget.offsetLeft)/60),
      y = Math.floor((event.pageY-event.currentTarget.offsetTop)/60);
      console.log(x,y);
      socket.emit("check",{roomID:roomID,src:{x:coords.x,y:coords.y},dest:{x:x,y:y}});
      container.removeEventListener("click",boardClick,false);
    }
  };

  return (
    <div
    id="c_board"
    style={{
        backgroundImage: `url(/src/assets/board.png)`,
        height: 480,
        width: 480,
        position:'relative',
        marginLeft:'33%'
    }}
    onClick = {detectClick}
    >
    <Board c_b={chess_board} />
    </div>
)
};


export default App


// chess_board.map((row, rowIndex) => (
//   <React.Fragment key={rowIndex}>
//       {row.map((p, colIndex) => (
//       <React.Fragment key={`${rowIndex}-${colIndex}`}>
//           {p !== '-' ? (
//           <img
//               src={`/src/assets/pieces/${p[0]+p[1]+p[2]}.png`}
//               style={{
//               width: '60px',
//               height: '60px',
//               left: `${colIndex * 60}px`,
//               top: `${rowIndex * 60}px`,
//               position: 'absolute',
//               }}
//               id = {p}
//               name = {p}
//           />
//           ) : (
//           <img />
//           )}
//       </React.Fragment>
//       ))}
//   </React.Fragment>
//   ))