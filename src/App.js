import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import MultiplayerPage from './views/MultiplayerPage/MultiplayerPage';
import WaitingRoom from './views/WaitingRoom/WaitingRoom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Homepage/> } />
          <Route path='/MultiplayerPage' element={ <MultiplayerPage/> }/>
          <Route path='/WaitingRoom' element={ <WaitingRoom/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
