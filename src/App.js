import React from 'react';
import Map from "./feature/Map/Map";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from './routes/Layout';
import Car from './feature/Map/Car';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Map />} />
          <Route path="/car" element={<Car />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
