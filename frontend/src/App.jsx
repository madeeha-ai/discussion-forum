import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreadList from './pages/ThreadList';
import ThreadDetail from './pages/ThreadDetail';
import CreateThread from './pages/CreateThread';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/thread/:id" element={<ThreadDetail />} />
        <Route path="/create" element={<CreateThread />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react'

// function App() {
//   return (
//     <div>App</div>
//   )
// }

// export default App
