import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateSongs from './component/CreateSongs';
import SongsContainer from './component/SongsContainer';

const  App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<SongsContainer/>} />
          <Route path="/create-songs" element={<CreateSongs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
