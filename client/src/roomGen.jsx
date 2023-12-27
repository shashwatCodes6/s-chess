import React, { useState, useEffect } from 'react';
import { socket } from './socket';

export default function RoomGen() {
  var [link,setLink] = useState('');

  function generateRoomLink() {
  //  console.log("yo");
    socket.emit('generateRoom', (roomId) => {
      const roomLink = window.location.origin + '/join/' + roomId;
      console.log(roomLink);
      setLink(roomLink);
    });
  }

  useEffect(() => {
    function x(roomId){
      socket.emit('roomGenerated', roomId);
    }
    socket.on('generateRoom', x);
    return () => {
      socket.off('roomGenerated',x);
    };
  }, []);

  return (
     <div className='linkGenerator'>
       <h1>Chess Room Link Generator</h1>
       <button onClick={generateRoomLink}>Generate Room Link</button>
       <br></br>
       <a href = {link}>{link}</a>
     </div>
  );
}