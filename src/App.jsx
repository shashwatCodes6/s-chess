import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'


var check=0,move = 0, o_o_w=1, o_o_o_w=1, o_o_b=1, o_o_o_b=1,stalemate = 0;
var ans = [], selected_coords = [],prev_move=[];

function App() {
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
  var chess_board = init_chess_board;
  function square_in_check(coords){
    var ans1 = 0;
    var x = coords[0],y = coords[1];
    for(let i=1,j=1;j+y<8&&i+x<8;i++,j++){
      if(chess_board[x+i][y+j][0]==='b'&&move===0){
        if(chess_board[i+x][j+y][2]==='q'||chess_board[i+x][j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x+i][y+j][0]==='w'&&move===0){
        break;
      }
      if(chess_board[x+i][y+j][0]==='w'&&move===1){
        if(chess_board[i+x][j+y][2]==='q'||chess_board[i+x][j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x+i][y+j][0]==='b'&&move===1){
        break;
      }
    }
    for(let i=1,j=1;y-j>=0&&i+x<8;i++,j++){
      if(chess_board[x+i][y-j][0]==='b'&&move===0){
        if(chess_board[i+x][-j+y][2]==='q'||chess_board[i+x][-j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x+i][y-j][0]==='w'&&move===0){
        break;
      }
      if(chess_board[x+i][y-j][0]==='w'&&move===1){
        if(chess_board[i+x][-j+y][2]==='q'||chess_board[i+x][-j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x+i][y-j][0]==='b'&&move===1){
        break;
      }
    }
    for(let i=1,j=1;j+y<8&&x-i>=0;i++,j++){
      if(chess_board[x-i][y+j][0]==='b'&&move===0){
        if(chess_board[-i+x][j+y][2]==='q'||chess_board[-i+x][j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x-i][y+j][0]==='w'&&move===0){
        break;
      }
      if(chess_board[x-i][y+j][0]==='w'&&move===1){
        if(chess_board[-i+x][j+y][2]==='q'||chess_board[-i+x][j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x-i][y+j][0]==='b'&&move===1){
        break;
      }
    }
    for(let i=1,j=1;y-j>=0&&x-i>=0;i++,j++){
      if(chess_board[x-i][y-j][0]==='b'&&move===0){
        if(chess_board[-i+x][-j+y][2]==='q'||chess_board[-i+x][-j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x-i][y-j][0]==='w'&&move===0){
        break;
      }
      if(chess_board[x-i][y-j][0]==='w'&&move===1){
        if(chess_board[-i+x][-j+y][2]==='q'||chess_board[-i+x][-j+y][2]==='b')
          ans1=1;
        break;
      }else if(chess_board[x-i][y-j][0]==='b'&&move===1){
        break;
      }
    }
    var arr = [[x+1,y+2],[x-1,y+2],[x+1,y-2],[x-1,y-2],[x+2,y+1],[x+2,y-1],[x-2,y+1],[x-2,y-1]];
    arr.forEach(i=>{
      var r = i[0],c = i[1];
      if((r<0||c<0||r>7||c>7||(chess_board[r][c][0]==='b'&&move===1)||(chess_board[r][c][0]==='w'&&move===0))===false){
        if(chess_board[r][c][2]==='n'){
          ans1=1;
        }
      }
    });
    for(let i=1;i+x<8;i++){
      if(chess_board[x+i][y][0]==='w'&&move===0){
        break;
      }else if(chess_board[x+i][y][0]==='w'&&move===1){
        if(chess_board[x+i][y][2]==='r'||chess_board[x+i][y][2]==='q'){
          ans1=1;
        }break;
      }
      else if(chess_board[x+i][y][0]==='b'&&move===1){
        break;
      }else if(chess_board[x+i][y][0]==='b'&&move===0){
        if(chess_board[x+i][y][2]==='r'||chess_board[x+i][y][2]==='q'){
          ans1=1;
        }break;
      }
    }
    for(let i=1;-i+x>=0;i++){
      if(chess_board[x-i][y][0]==='w'&&move===0){
        break;
      }else if(chess_board[x-i][y][0]==='w'&&move===1){
        if(chess_board[x-i][y][2]==='r'||chess_board[x-i][y][2]==='q'){
          ans1=1;
        }break;
      }
      else if(chess_board[x-i][y][0]==='b'&&move===1){
        break;
      }else if(chess_board[x-i][y][0]==='b'&&move===0){
        if(chess_board[x-i][y][2]==='r'||chess_board[x-i][y][2]==='q'){
          ans1=1;
        }break;
      }
    }
    for(let j=1;y+j<8;j++){
      if(chess_board[x][y+j][0]==='w'&&move===0){
        break;
      }else if(chess_board[x][y+j][0]==='w'&&move===1){
        if(chess_board[x][y+j][2]==='r'||chess_board[x][y+j][2]==='q'){
          ans1=1;
        }break;
      }
      else if(chess_board[x][y+j][0]==='b'&&move===1){
        break;
      }else if(chess_board[x][y+j][0]==='b'&&move===0){
        if(chess_board[x][y+j][2]==='r'||chess_board[x][y+j][2]==='q'){
          ans1=1;
        }break;
      }
    }
    for(let j=1;y-j>=0;j++){
      if(chess_board[x][y-j][0]==='w'&&move===0){
        break;
      }else if(chess_board[x][y-j][0]==='w'&&move===1){
        if(chess_board[x][y-j][2]==='r'||chess_board[x][y-j][2]==='q'){
         ans1=1;
        }break;
      }
      else if(chess_board[x][y-j][0]==='b'&&move===1){
        break;
      }else if(chess_board[x][y-j][0]==='b'&&move===0){
        if(chess_board[x][y-j][2]==='r'||chess_board[x][y-j][2]==='q'){
          ans1=1;
        }break;
      }
    }
    return ans1;
  }
  function detectClick(event) {
    var king = [];
    for(let i=0;i<8;i++){
      for(let j=0;j<8;j++){
        if((chess_board[i][j]==='w_k5'&&move===0)||(move===1&&chess_board[i][j]==='b_k4')){
          king = [i,j];
        }
      }
    }
    //check and stalemate checks
    if(square_in_check(king)){
      check = 1;
      for(let i=0;i<8&&check;i++){
        for(let j=0;check&&j<8;j++){
          if((chess_board[i][j][0]==='w'&&move===0)||(move===1&&chess_board[i][j][0]==='b')){
            load_poss_moves({x:i,y:j});
            ans.forEach(e=>{
              var x = chess_board[e[0]][e[1]];
              chess_board[e[0]][e[1]] = chess_board[i][j];
              chess_board[i][j] = '-';
              for(let k=0;k<8;k++){
                for(let l=0;l<8;l++){
                  if((chess_board[k][l]==='w_k5'&&move===0)||(move===1&&chess_board[k][l]==='b_k4')){
                    king = [k,l];
                  }
                }
              }
              if(!square_in_check(king)){
                check = 0;
              }
              chess_board[i][j] = chess_board[e[0]][e[1]];
              chess_board[e[0]][e[1]] = x;
            })
            ans = [];
            for(let k=0;k<8;k++){
              for(let l=0;l<8;l++){
                if((chess_board[k][l]==='w_k5'&&move===0)||(move===1&&chess_board[k][l]==='b_k4')){
                  king = [k,l];
                }
              }
            }
          }
        }
      }
      if(check===1){
        alert((move===0?"Black":"White")+" wins!!");
        move = 0;
        ans = [];selected_coords = [];
        prev_move = [];
        chess_board = init_chess_board;
        check = 0,move = 0, o_o_w=1, o_o_o_w=1, o_o_b=1, o_o_o_b=1
        return;
      }
    }else{
      stalemate=1;
      for(let i=0;i<8&&stalemate;i++){
        for(let j=0;stalemate&&j<8;j++){
          if((chess_board[i][j][0]==='w'&&move===0)||(move===1&&chess_board[i][j][0]==='b')){
            load_poss_moves({x:i,y:j});
            ans.forEach(e=>{
              var x = chess_board[e[0]][e[1]];
              chess_board[e[0]][e[1]] = chess_board[i][j];
              chess_board[i][j] = '-';
              for(let k=0;k<8;k++){
                for(let l=0;l<8;l++){
                  if((chess_board[k][l]==='w_k5'&&move===0)||(move===1&&chess_board[k][l]==='b_k4')){
                    king = [k,l];
                  }
                }
              }
              if(!square_in_check(king)){
                stalemate=0;
              }
              chess_board[i][j] = chess_board[e[0]][e[1]];
              chess_board[e[0]][e[1]] = x;
            })
            ans = [];
          }
        }
      }
      if(stalemate){
        alert("Stalemate!");
        move = 0;
        ans = [];selected_coords = [];
        prev_move = [];
        chess_board = init_chess_board;
        check = 0,move = 0, o_o_w=1, o_o_o_w=1, o_o_b=1, o_o_o_b=1,stalemate=0;
        return;
      }
    }
    const element = document.querySelector("#c_board");
    element.removeEventListener("click",detectClick,false);
    var x = Math.floor((event.pageX-event.currentTarget.offsetLeft)/60),
    y = Math.floor((event.pageY-event.currentTarget.offsetTop)/60);
    if(!(chess_board[y][x]==='-'||(move===1&&chess_board[y][x][0]==='w')||(move===0&&chess_board[y][x][0]==='b'))){
      document.querySelector("#c_board").removeEventListener("click",detectClick,false);
      load_poss_moves({x:y,y:x});
      document.querySelector("#c_board").addEventListener("click",detectClick,false);
    }
  }
  const load_poss_moves = (coords)=>{
    var piece = chess_board[coords.x][coords.y];
    var x = coords.x,y = coords.y;
    selected_coords = [x,y];
    //king in check before
    ans = [];
    if(piece[2]==='k'){
      // condition for check
      // castle o-o and o-o-o
      // can move to any one 8 directional sq if no opp piece attacks
      if(x+1<8&&chess_board[x+1][y][0]!=piece[0])
        ans.push([x+1,y]);
      if(x-1>=0&&chess_board[x-1][y][0]!=piece[0])
        ans.push([x-1,y]);
      if(y+1<8&&chess_board[x][y+1][0]!=piece[0])
        ans.push([x,y+1]);
      if(y-1>=0&&chess_board[x][y-1][0]!=piece[0])
        ans.push([x,y-1]);
      if(x+1<8&&y-1>=0&&chess_board[x+1][y-1][0]!=piece[0])
        ans.push([x+1,y-1]);
      if(x-1>=0&&y-1>=0&&chess_board[x-1][y-1][0]!=piece[0])
        ans.push([x-1,y-1]);
      if(y+1<8&&x+1<8&&chess_board[x+1][y+1][0]!=piece[0])
        ans.push([x+1,y+1]);
      if(y+1<8&&x-1>=0&&chess_board[x-1][y+1][0]!=piece[0])
        ans.push([x-1,y+1]);
      // CASTLING
      if(piece[0]==='w'){
        console.log();
        if(o_o_w&&chess_board[x][y+1]==='-'&&!square_in_check([x,y+1])&&
        chess_board[x][y+2]==='-'&&!square_in_check([x,y+2])&&!square_in_check([x,y+3])){
          ans.push([x,y+2,'o-o-w']);
        }
        if(o_o_o_w&&chess_board[x][y-1]==='-'&&!square_in_check([x,y-1])&&
        chess_board[x][y-2]==='-'&&!square_in_check([x,y-2])&&
        chess_board[x][y-3]==='-'&&!square_in_check([x,y-3])&&!square_in_check([x,y-4])){
          ans.push([x,y-2,'o-o-o-w']);
        }
      }else{
        if(o_o_b&&chess_board[x][y+1]==='-'&&!square_in_check([x,y+1])&&
        chess_board[x][y+2]==='-'&&!square_in_check([x,y+2])&&!square_in_check([x,y+3])){
          ans.push([x,y+2,'o-o-b']);
        }
        if(o_o_o_b&&chess_board[x][y-1]==='-'&&!square_in_check([x,y-1])&&
        chess_board[x][y-2]==='-'&&!square_in_check([x,y-2])&&
        chess_board[x][y-3]==='-'&&!square_in_check([x,y-3])&&!square_in_check([x,y-4])){
          ans.push([x,y-2,'o-o-o-b']);
        }
      }
    }else if(piece[2]==='p'){
      // first move can be double/single
      // en passant
      // promotion at last square
      // ** check for obstructions
      // takes diagonally if any piece of opp is there
      if(piece[0]==='w'){
        if(chess_board[x-1][y]==='-')
          ans.push([x-1,y]); 
        if(y>0&&chess_board[x-1][y-1][0]==='b')
          ans.push([x-1,y-1]);
        if(y<7&&chess_board[x-1][y+1][0]==='b')
          ans.push([x-1,y+1]);
        if(chess_board[x-2][y]==='-'&&x===6)
          ans.push([x-2,y]);
        
        // en passant left
      }else if(piece[0]==='b'){
        if(chess_board[x+1][y]==='-')
          ans.push([x+1,y]);  
        if(y>0&&chess_board[x+1][y-1][0]==='w')
          ans.push([x+1,y-1]);
        if(y<7&&chess_board[x+1][y+1][0]==='w')
          ans.push([x+1,y+1]);
        if(chess_board[x+2][y]==='-'&&x===1)
          ans.push([x+2,y]);
      }
  
  
    }else if(piece[2]==='n'){
      // can move in L shape
      // capture if opp piece is on selected 
      var arr = [[x+1,y+2],[x-1,y+2],[x+1,y-2],[x-1,y-2],[x+2,y+1],[x+2,y-1],[x-2,y+1],[x-2,y-1]];
      arr.forEach(i=>{
        var r = i[0],c = i[1];
        if((r<0||c<0||r>7||c>7||chess_board[r][c][0]===piece[0])===false){
          ans.push([r,c]);
        }
      });
  
    }else if(piece[2]==='b'){
      // moves diagonally
      for(let i=1,j=1;j+y<8&&i+x<8;i++,j++){
        if(chess_board[x+i][y+j]!='-'){
          if(chess_board[i+x][j+y][0]!=piece[0])
            ans.push([i+x,y+j]);
          break;
        }
        ans.push([x+i,y+j]);
      }
      for(let i=1,j=1;y-j>=0&&i+x<8;i++,j++){
        if(chess_board[x+i][y-j]!='-'){
          if(chess_board[i+x][y-j][0]!=piece[0])
            ans.push([i+x,y-j]);
          break;
        }
        ans.push([x+i,y-j]);
      }
      for(let i=1,j=1;j+y<8&&x-i>=0;i++,j++){
        if(chess_board[x-i][y+j]!='-'){
          if(chess_board[x-i][j+y][0]!=piece[0])
            ans.push([x-i,y+j]);
          break;
        }
        ans.push([x-i,y+j]);
      }
      for(let i=1,j=1;y-j>=0&&x-i>=0;i++,j++){
      //  console.log(x-i,y-j);
        if(chess_board[x-i][y-j]!='-'){
          if(chess_board[x-i][-j+y][0]!=piece[0])
            ans.push([x-i,y-j]);
          break;
        }
        ans.push([x-i,y-j]);
      }
  
    }else if(piece[2]==='q'){
      // combination of rook + bishop
      for(let i=1,j=1;j+y<8&&i+x<8;i++,j++){
        if(chess_board[x+i][y+j]!='-'){
          if(chess_board[i+x][j+y][0]!=piece[0])
            ans.push([i+x,y+j]);
          break;
        }
        ans.push([x+i,y+j]);
      }
      for(let i=1,j=1;y-j>=0&&i+x<8;i++,j++){
        if(chess_board[x+i][y-j]!='-'){
          if(chess_board[i+x][y-j][0]!=piece[0])
            ans.push([i+x,y-j]);
          break;
        }
        ans.push([x+i,y-j]);
      }
      for(let i=1,j=1;j+y<8&&x-i>=0;i++,j++){
        if(chess_board[x-i][y+j]!='-'){
          if(chess_board[x-i][j+y][0]!=piece[0])
            ans.push([x-i,y+j]);
          break;
        }
        ans.push([x-i,y+j]);
      }
      for(let i=1,j=1;y-j>=0&&x-i>=0;i++,j++){
       // console.log(x-i,y-j);
        if(chess_board[x-i][y-j]!='-'){
          if(chess_board[x-i][-j+y][0]!=piece[0])
            ans.push([x-i,y-j]);
          break;
        }
        ans.push([x-i,y-j]);
      }
      for(let i=1;i+x<8;i++){
        if(chess_board[x+i][y]!='-'){
          if(chess_board[i+x][y][0]!=piece[0])
            ans.push([i+x,y]);
          break;
        }
        ans.push([x+i,y]);
      }
      for(let i=1;-i+x>=0;i++){
        if(chess_board[x-i][y]!='-'){
          if(chess_board[-i+x][y][0]!=piece[0])
            ans.push([-i+x,y]);
          break;
        }
        ans.push([x-i,y]);
      }
      for(let j=1;y+j<8;j++){
        if(chess_board[x][y+j]!='-'){
          if(chess_board[x][j+y][0]!=piece[0])
            ans.push([x,y+j]);
          break;
        }
        ans.push([x,y+j]);
      }
      for(let j=1;y-j>=0;j++){
        if(chess_board[x][y-j]!='-'){
          if(chess_board[x][-j+y][0]!=piece[0])
            ans.push([x,y-j]);
          break;
        }
        ans.push([x,y-j]);
      }
    }else if(piece[2]==='r'){
      // moves vertically and horizontally
      for(let i=1;i+x<8;i++){
        if(chess_board[x+i][y]!='-'){
          if(chess_board[i+x][y][0]!=piece[0]){
            ans.push([i+x,y]);
           // console.log(problem);
          }
          break;
        }
        ans.push([x+i,y]);
      }
      for(let i=1;-i+x>=0;i++){
        if(chess_board[x-i][y]!='-'){
          if(chess_board[-i+x][y][0]!=piece[0]){
            ans.push([-i+x,y]);
          }
          break;
        }
        ans.push([x-i,y]);
      }
      for(let j=1;y+j<8;j++){
        if(chess_board[x][y+j]!='-'){
          if(chess_board[x][j+y][0]!=piece[0])
            ans.push([x,y+j]);
          break;
        }
        ans.push([x,y+j]);
      }
      for(let j=1;y-j>=0;j++){
        if(chess_board[x][y-j]!='-'){
          if(chess_board[x][-j+y][0]!=piece[0])
            ans.push([x,y-j]);
          break;
        }
        ans.push([x,y-j]);
      }
    }
    // additional check filter()
    console.log("possible moves-",ans);
    if(!check)
      setTheBoard(piece);
  }
  const setTheBoard = (piece_id) => {
    //console.log(piece_id);
    var theThing = document.querySelector("#"+piece_id);
    var container = document.querySelector("#c_board");
    container.addEventListener("click", boardClick, false);
    function boardClick(event){
      var x = Math.floor((event.pageX-event.currentTarget.offsetLeft)/60),
      y = Math.floor((event.pageY-event.currentTarget.offsetTop)/60);
      var legal = 0;
      var ret = selected_coords;
      if(selected_coords.length!==0){
        //console.log("sel_coords->",selected_coords);
        if(chess_board[selected_coords[0]][selected_coords[1]]!='-'&&
        ((move===0&&chess_board[selected_coords[0]][selected_coords[1]][0]==='b')||
        (move===1&&chess_board[selected_coords[0]][selected_coords[1]][0]==='w'))){
          ret=selected_coords; selected_coords=[];
        }else{
          //console.log("ans->",ans," move made",x,y);
          var castlerook = '';
          ans.map((i)=>{
            if(i[0]===y&&i[1]===x){
              legal = 1;
              if(i.length>2)
                castlerook=i[2];
            }
          });
          if(legal===1){
            if(piece_id[2] === 'k'){
              if(piece_id[0]==='w'){
                o_o_w=0,o_o_o_w=0;
              }else o_o_b=0,o_o_o_b=0;
            }
            if(piece_id[2] === 'r'){
              if(piece_id==='w_r8')o_o_w=0;
              if(piece_id==='w_r1')o_o_o_w=0;
              if(piece_id==='b_r8')o_o_o_b=0;
              if(piece_id==='w_r1')o_o_b=0;
            }
            if(piece_id[2]==='p'){
              if(y===0&&piece_id[0]==='w'){

              }else if(y===7&&piece_id[0]==='b'){
                
              }
            }
            if(((move===0&&chess_board[y][x][0]==='b')||(move===1&&chess_board[y][x][0]==='w'))){
              var piece_to_captureded = document.querySelector("#"+chess_board[y][x]);
              piece_to_captureded.style.display='none';
            }
            move=1-move;
            chess_board[y][x] = chess_board[selected_coords[0]][selected_coords[1]];
            chess_board[selected_coords[0]][selected_coords[1]] = '-';
            if(castlerook==='o-o-w'){
              chess_board[7][7] = '-';
              chess_board[7][5] = 'w_r8';
            }else if(castlerook==='o-o-o-w'){
              chess_board[7][0] = '-';
              chess_board[7][3] = 'w_r1';
            }else if(castlerook==='o-o-b'){
              chess_board[0][7] = '-';
              chess_board[0][5] = 'b_r1';
            }else if(castlerook==='o-o-o-b'){
              chess_board[0][0] = '-';
              chess_board[0][3] = 'b_r8';
            }
            ret = [y,x];
          }else ret = selected_coords;
          //console.log(chess_board);
         // console.log("selected",y,x);
        }
      }
      prev_move = [selected_coords,ret];
      ans = [];selected_coords=[];
      var king_cords = [];
     // console.log("ret",ret);
      for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
          if(chess_board[i][j]==='-')
            continue;
          if(1-move===0){
            if(chess_board[i][j]==='w_k5'){
              king_cords = [i,j];
            }
          }else{
            if(chess_board[i][j]==='b_k4'){
              king_cords = [i,j];
            }
          }
          var theThing = document.querySelector("#"+chess_board[i][j]);
          theThing.style.left = `${j*60}px`;
          theThing.style.top = `${i*60}px`;
        }
      }
      console.log(prev_move,"previous");
      move = 1-move;
      if(square_in_check(king_cords)){
        chess_board[prev_move[0][0]][prev_move[0][1]] = chess_board[prev_move[1][0]][prev_move[1][1]];
        chess_board[prev_move[1][0]][prev_move[1][1]] = '-';
        for(let i=0;i<8;i++){
          for(let j=0;j<8;j++){
            if(chess_board[i][j]==='-')
              continue;
            var theThing = document.querySelector("#"+chess_board[i][j]);
            theThing.style.left = `${j*60}px`;
            theThing.style.top = `${i*60}px`;
          }
        }
      }else{ 
        move = 1-move;
      }
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
    {chess_board.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((p, colIndex) => (
              <React.Fragment key={`${rowIndex}-${colIndex}`}>
                {p !== '-' ? (
                  <img
                    src={`src/assets/pieces/${p[0]+p[1]+p[2]}.png`}
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
        ))}
    </div>
  );
}


export default App