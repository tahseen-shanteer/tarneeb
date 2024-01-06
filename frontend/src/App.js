import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import MultiplayerPage from './views/MultiplayerPage/MultiplayerPage';
import WaitingRoom from './views/WaitingRoom/WaitingRoom';
import Game from './views/Game/Game';
import HostMediatorRoom from './views/HostMediatorRoom/HostMediatorRoom';
import TarneebHeader from './Components/TarneebHeader/TarneebHeader';
import socket from './socket';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {!window.location.pathname.includes("game") ? <TarneebHeader /> : null}
        <Routes>
          <Route path='/' element={ <Homepage/> } />
          <Route path='/MultiplayerPage' element={ <MultiplayerPage/> }/>
          <Route path='/WaitingRoom' element={ <WaitingRoom/> }/>
          <Route path='/Game' element={<Game/>}/>
          <Route path='/CreateGame' element={ <HostMediatorRoom/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
