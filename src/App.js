import React from 'react';
// import Map from "./feature/Map/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './routes/Layout';
import Map1 from './feature/Map/Map1';
import {
  Vehicles,
  VehicleItem,
  VehicleItemNew
} from './feature/Vehicles';
import {
  Bins,
  BinItem,
  BinItemNew
} from './feature/Bins';

import {
  Drivers,
  DriverItem,
  DriverItemNew
} from './feature/Driver';
import Login from './feature/Auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />} >
          <Route index element={<Map1 />} />
          <Route path="map" element={<Map1 />} />

          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/:vehicleId" element={<VehicleItem />} />
          <Route path="vehicles/add" element={<VehicleItemNew state={"new"} />} />
          <Route path="vehicles/edit/:vehicleId" element={<VehicleItemNew state={"edit"} />} />

          <Route path="bins" element={<Bins />} />
          <Route path="bins/:binId" element={<BinItem />} />
          <Route path="bins/add" element={<BinItemNew state={"new"} />} />
          <Route path="bins/edit/:binId" element={<BinItemNew state={"edit"} />} />


          <Route path="drivers" element={<Drivers />} />
          <Route path="drivers/:driverId" element={<DriverItem />} />
          <Route path="drivers/add" element={<DriverItemNew state={"new"} />} />
          <Route path="drivers/edit/:driverId" element={<DriverItemNew state={"edit"} />} />


          <Route path="*" element={<div>Not Found</div>} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
