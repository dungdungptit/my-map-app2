import React, { Fragment, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import {
    getVehiclesDataAsync,
    vehiclesSelector,
    putVehiclesDataAsync,
} from "../../store/reducers/vehicleSlice";
import {
    getBinsDataAsync,
    binsSelector
} from "../../store/reducers/binSlice";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { Button } from '@mui/material';

import { vehicles } from '../../api/vehicle/vehicles';
import Routing from './Routing';



const Map = () => {
    // const dispatch = useDispatch();
    // const vehicles = useSelector(vehiclesSelector);
    // const bins = useSelector(binsSelector);

    // console.log('vehicles', vehicles);
    // console.log('bins', bins);

    // setInterval(() => {
    // useEffect(() => {
    //     dispatch(getVehiclesDataAsync())
    //     dispatch(getBinsDataAsync())
    // }, [dispatch])
    // }, 300);
    // Create WebSocket connection.
    // const socket = new WebSocket('ws://192.168.1.86:3000/2');
    // const socket2 = new WebSocket('ws://192.168.1.86:3000/1');
    // const socket3 = io('http://192.168.1.3:3000');

    // const socket = new WebSocket('ws://172.20.10.3:3000');
    const [position, setPosition] = useState([21.0419, 105.821]);

    // useEffect(() => {
    //     // Connection opened
    //     socket.addEventListener('open', function (event) {
    //         console.log('Connected to WS Server');
    //         socket.send(
    //             JSON.stringify(
    //                 // {
    //                 //     data: 'Hello Server!',
    //                 //     type: 'vehicle'
    //                 // }
    //                 [2, 21.0382, 105.82501]
    //             )
    //         );
    //     });

    //     // Listen for messages


    // }, [socket]);

    // socket.addEventListener('message', function (event) {
    //     // server return data [lat, long]
    //     let data = JSON.parse(event.data);
    //     console.log(data);
    //     // setPosition((prev) => {
    //     //     const newPrev = [...prev];
    //     //     newPrev[0] = data[0];
    //     //     newPrev[1] = data[1];
    //     //     return newPrev;
    //     // });
    //     // setPosition(JSON.parse(event['data']).data);

    // });


    // const position = [21.023300, 105.840225];
    const iconXe = new L.Icon({ iconUrl: 'https://img.icons8.com/ios/50/000000/car.png', iconSize: [50, 50] })
    const iconBin = new L.Icon({ iconUrl: 'https://img.icons8.com/ios/50/000000/trash.png', iconSize: [50, 50] })

    return (
        <Fragment>
            <MapContainer center={[21.0419, 105.821]} zoom={13} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Routing />
                <Marker position={position} icon={iconXe}>
                </Marker>
                {!!vehicles && vehicles.map((vehicle) => (
                    <Marker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={iconXe}>
                    </Marker>
                ))}
                {/* {!!bins && bins.map((bin) => (
                    <Marker key={bin.id} position={[bin.latitude, bin.longitude]} icon={iconBin}>
                    </Marker>
                ))} */}
            </MapContainer>
            {/* car info */}
            <div className="vehicles-info">
                <h1>Thông tin xe</h1>
                {vehicles.length}
                <ul>
                    {!!vehicles !== undefined && vehicles.map(vehicle => (
                        <li key={vehicle.id}>
                            <h3>{vehicle.name}</h3>
                            <p>Latitude: {vehicle.latitude}</p>
                            <p>Longitude: {vehicle.longitude}</p>
                            <p>Src Image: {vehicle.image}</p>
                            <p>Updated At: {vehicle.updatedAt}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <Button onClick={sendMessage}>Send</Button> */}
        </Fragment>

    )
}


export default Map