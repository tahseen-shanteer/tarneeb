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

  const [gameCode, setGameCode] = useState(null);
  const [thisPlayer, setThisPlayer] = useState(null);
  const [lobbyData, setLobbyData] = useState(null);


  useEffect(() => {
    socket.on('teamJoined', () =>{
      alert("a player has joined a team haha");
    });
  }, [socket]);
  return (
    <div className="App">
      <BrowserRouter>
        {!window.location.pathname.includes("game") ? <TarneebHeader /> : null}
        <Routes>
          <Route path='/' element={ <Homepage/> } />
          <Route path='/MultiplayerPage' element={ <MultiplayerPage gameCode={gameCode} setGameCode={setGameCode}/> }/>
          <Route path='/WaitingRoom' element={ <WaitingRoom lobbyData={lobbyData} setLobbyData={setLobbyData} gameCode={gameCode} thisPlayer={thisPlayer}/> }/>
          <Route path='/Game' element={<Game/>}/>
          <Route path='/CreateGame' element={ <HostMediatorRoom setLobbyData={setLobbyData} gameCode={gameCode} setGameCode={setGameCode} thisPlayer={thisPlayer} setThisPlayer={setThisPlayer}/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
