import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomGen from './roomGen'
import Join from './joinRoom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/roomGen" element={<RoomGen />} />
        <Route path="/join/:roomID" element={<Join />} />
  </Routes>
  </BrowserRouter>
);