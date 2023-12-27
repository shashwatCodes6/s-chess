import React from 'react'
import { useState, useEffect } from 'react'
import { renderMatches } from 'react-router-dom';
import './App.css'
import { socket } from './socket';

const row_mapping = {
  0:8,1:7,2:6,3:5,4:4,5:3,6:2,7:1
}

const col_mapping = {
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

function App(props) {
  const roomID = props.id;
  var [chess_board,setBoard] = useState(init_chess_board);
  function Board(){
    var c_b = chess_board;
    return <div id="c_board">
      {c_b.map((row, rowIndex) => (
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
                id={p}
                name={p}
              />
            ) : (
              <img />
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
    </div>;
  }
  const playTheMove = (xdest,ydest,xsrc,ysrc,ele1)=>{
    const ele = chess_board[ysrc][xsrc];
    console.log(xdest, ydest, xsrc, ysrc, ele);
    if(ele !== '-'){
      var elee = document.querySelector("#" + ele);
      console.log(elee);
      elee.style.left = xdest * 60 + 'px';
      elee.style.top =  ydest * 60 + 'px';
      chess_board[ydest][xdest] = ele;
      chess_board[ysrc][xsrc] = '-';
      console.log(elee);
      setBoard(chess_board);
    }
  };
  
  useEffect(()=>{
    socket.on("gameDetails",(res)=>{
      if(res.roomID === roomID){
        console.log("***" , res);
        if(res.xdes !== -1){
          playTheMove(col_mapping[res.xdes], row_mapping[res.ydes], col_mapping[res.x], row_mapping[res.y], chess_board[col_mapping[res.x]][row_mapping[res.y]]);
        }
        console.log(chess_board);
      }
    });

  },[]); 

  function detectClick(event) {
    const element = document.querySelector("#c_board");
    element.removeEventListener("click",detectClick,false);
    var x = Math.floor((event.pageX-event.currentTarget.offsetLeft)/60),
    y = Math.floor((event.pageY-event.currentTarget.offsetTop)/60);
    document.querySelector("#c_board").removeEventListener("click",detectClick,false);
    func({x:x,y:y});
    document.querySelector("#c_board").addEventListener("click",detectClick,false);
  }

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
    {
      init_chess_board.map((row, rowIndex) => (
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
    }
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