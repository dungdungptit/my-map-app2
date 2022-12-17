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
  const useAuth = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user);
    } else {
      return null
    }
  }

  const isAdmin = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return !!user && JSON.parse(user).role.includes('admin');
    } else {
      return false
    }
  }

  const isManager = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return !!user && JSON.parse(user).role.includes('manager');
    } else {
      return false
    }
  }

  const auth = useAuth();
  console.log(auth);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="" element={<Layout />} >
          <Route index element={<Map1 />} />
          <Route path="map" element={<Map1 />} />

          {(isAdmin() || isManager()) && <Route path="dashboard" element={<Dashboard />} />}

          {(isAdmin() || isManager()) && <Route path="vehicles" element={<Vehicles />} />}
          {(isAdmin() || isManager()) && <Route path="vehicles/:vehicleId" element={<VehicleItem />} />}
          {(isAdmin() || isManager()) && <Route path="vehicles/add" element={<VehicleItemNew state={"new"} />} />}
          {(isAdmin() || isManager()) && <Route path="vehicles/edit/:vehicleId" element={<VehicleItemNew state={"edit"} />} />}

          {(isAdmin() || isManager()) && <Route path="drivers" element={<Drivers />} />}
          {(isAdmin() || isManager()) && <Route path="drivers/:driverId" element={<DriverItem />} />}
          {(isAdmin() || isManager()) && <Route path="drivers/add" element={<DriverItemNew state={"new"} />} />}
          {(isAdmin() || isManager()) && <Route path="drivers/edit/:driverId" element={<DriverItemNew state={"edit"} />} />}

          {(isAdmin() || isManager()) && <Route path="bins" element={<Bins />} />}
          {(isAdmin() || isManager()) && <Route path="bins/:binId" element={<BinItem />} />}
          {(isAdmin() || isManager()) && <Route path="bins/add" element={<BinItemNew state={"new"} />} />}
          {(isAdmin() || isManager()) && <Route path="bins/edit/:binId" element={<BinItemNew state={"edit"} />} />}


          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        {/* <Route path='register' element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
