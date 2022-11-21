import React from 'react';
// import Map from "./feature/Map/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './routes/Layout';
import Map1 from './feature/Map/Map1';
import Dashboard from './feature/Dashboard/Dashboard';
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
import { useSelector } from 'react-redux';
import { authSelector } from './store/reducers/authSlice';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

const App = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="" element={<Layout />} >
            <Route index element={<Map1 />} />
            <Route path="map" element={<Map1 />} />

            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="dashboard" element={<Dashboard />} />}

            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="vehicles" element={<Vehicles />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="vehicles/:vehicleId" element={<VehicleItem />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="vehicles/add" element={<VehicleItemNew state={"new"} />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="vehicles/edit/:vehicleId" element={<VehicleItemNew state={"edit"} />} />}

            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="drivers" element={<Drivers />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="drivers/:driverId" element={<DriverItem />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="drivers/add" element={<DriverItemNew state={"new"} />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="drivers/edit/:driverId" element={<DriverItemNew state={"edit"} />} />}

            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="bins" element={<Bins />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="bins/:binId" element={<BinItem />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="bins/add" element={<BinItemNew state={"new"} />} />}
            {!!auth && (auth.role.includes('admin') || auth.role.includes('superadmin')) && <Route path="bins/edit/:binId" element={<BinItemNew state={"edit"} />} />}


            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Route>
        <Route path="*" element={<PublicRoutes />}>
          {/* <Route path='register' element={<Register />} /> */}
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
