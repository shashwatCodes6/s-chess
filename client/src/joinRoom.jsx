import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from './socket';
import Game from './game'
function Join(){
    const roomID = useParams().roomID;
   // console.log(roomID);
   useEffect(()=>{
    socket.emit("join-room",roomID);
    socket.on('alert',(message)=>{
        alert(message.message);
    });
   },[]);
   
    return (
        <Game id={roomID} move = {0} />
    );
}

export default Join;