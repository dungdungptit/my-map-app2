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
import { io } from "socket.io-client";
import Routing from './Routing';

var dataTemporary = [[21.0419, 105.821],
[21.04188, 105.82111],
[21.04186, 105.82137],
[21.04183, 105.82157],
[21.04182, 105.82168],
[21.04179, 105.82188],
[21.04173, 105.82209],
[21.04165, 105.82235],
[21.04158, 105.82258],
[21.04156, 105.82263],
[21.04155, 105.82265],
[21.04147, 105.82285],
[21.04143, 105.82296],
[21.04141, 105.82301],
[21.04129, 105.82333],
[21.0412, 105.82351],
[21.04114, 105.82361],
[21.04113, 105.82365],
[21.04105, 105.82384],
[21.041, 105.82393],
[21.0409, 105.82425],
[21.04085, 105.82441],
[21.04083, 105.82444],
[21.04077, 105.82462],
[21.04076, 105.82463],
[21.0407, 105.8248],
[21.04066, 105.82491],
[21.04057, 105.82516],
[21.04052, 105.82529],
[21.04045, 105.82548],
[21.0404, 105.82562],
[21.04037, 105.82576],
[21.04031, 105.82595],
[21.04023, 105.82618],
[21.04019, 105.8263],
[21.04016, 105.82637],
[21.04009, 105.82653],
[21.04007, 105.82656],
[21.04, 105.82671],
[21.03995, 105.82683],
[21.03986, 105.82702],
[21.03983, 105.82708],
[21.03977, 105.82731],
[21.03972, 105.82748],
[21.03965, 105.82769],
[21.03959, 105.82802],
[21.03952, 105.82841],
[21.03952, 105.8285],
[21.03953, 105.8286],
[21.03957, 105.82871],
[21.03957, 105.82871],
[21.03946, 105.82874],
[21.03921, 105.82882],
[21.03918, 105.82883],
[21.03881, 105.829],
[21.03866, 105.82904],
[21.03841, 105.82913],
[21.03839, 105.8292],
[21.03836, 105.82925],
[21.03823, 105.82966],
[21.03818, 105.82972],
[21.03806, 105.82977],
[21.03785, 105.82976],
[21.03776, 105.8299],
[21.03776, 105.83003],
[21.03776, 105.8302],
[21.03775, 105.83051],
[21.03777, 105.83096],
[21.03772, 105.83102],
[21.03767, 105.83105],
[21.03755, 105.83109],
[21.03751, 105.83109],
[21.03747, 105.83109],
[21.0374, 105.83109],
[21.03712, 105.8311],
[21.03677, 105.8311],
[21.03657, 105.8311],
[21.0365, 105.83112],
[21.03637, 105.83116],
[21.03621, 105.83121],
[21.03596, 105.83129],
[21.03583, 105.83133],
[21.03525, 105.83149],
[21.03512, 105.83153],
[21.03495, 105.83159],
[21.03486, 105.83162],
[21.03481, 105.83163],
[21.0347, 105.83167],
[21.03466, 105.83167],
[21.03452, 105.8317],
[21.03446, 105.83171],
[21.03446, 105.83171],
[21.03442, 105.83162],
[21.03442, 105.83157],
[21.03446, 105.83083],
[21.03448, 105.83052],
[21.03448, 105.83045],
[21.03449, 105.83027],
[21.03453, 105.82988],
[21.03454, 105.82975],
[21.03454, 105.82963],
[21.03457, 105.82924],
[21.03459, 105.82906],
[21.03461, 105.82883],
[21.03461, 105.82873],
[21.03462, 105.8286],
[21.03463, 105.8285],
[21.03463, 105.82849],
[21.03464, 105.82837],
[21.03465, 105.82828],
[21.03465, 105.82826],
[21.03465, 105.82825],
[21.03466, 105.82809],
[21.03467, 105.82804],
[21.03467, 105.828],
[21.03467, 105.82795],
[21.03468, 105.82789],
[21.0347, 105.8276],
[21.03471, 105.82746],
[21.03472, 105.82733],
[21.03472, 105.82717],
[21.03475, 105.82697],
[21.03476, 105.82678],
[21.03478, 105.82662],
[21.03483, 105.82607],
[21.03484, 105.82599],
[21.03485, 105.82574],
[21.03486, 105.82566],
[21.03487, 105.82559],
[21.03488, 105.82536],
[21.03489, 105.82532],
[21.03489, 105.82526],
[21.0349, 105.82513],
[21.03491, 105.82497],
[21.03491, 105.82493],
[21.03491, 105.82488],
[21.03493, 105.82467],
[21.03494, 105.82457],
[21.03494, 105.82451],
[21.03495, 105.82441],
[21.03497, 105.82411],
[21.03499, 105.8239],
[21.03506, 105.82336],
[21.03506, 105.82329],
[21.03507, 105.82319],
[21.03508, 105.8231],
[21.03509, 105.82297],
[21.03509, 105.82293],
[21.03509, 105.8229],
[21.0351, 105.82279],
[21.0351, 105.82271],
[21.03511, 105.82261],
[21.03513, 105.82235],
[21.03514, 105.8223],
[21.03514, 105.82224],
[21.03514, 105.82222],
[21.03515, 105.82213],
[21.03516, 105.82199],
[21.03516, 105.82196],
[21.03517, 105.82181],
[21.03518, 105.82169],
[21.03519, 105.82156],
[21.03519, 105.82148],
[21.0352, 105.8214],
[21.03523, 105.82101],
[21.03524, 105.82082],
[21.03527, 105.8203],
[21.03527, 105.8203],
[21.03541, 105.82032],
[21.03559, 105.82034],
[21.03613, 105.82038],
[21.03635, 105.8204],
[21.03659, 105.8204],
[21.03685, 105.82043],
[21.03705, 105.82045],
[21.03723, 105.82048],
[21.03856, 105.82064],
[21.03874, 105.82066],
[21.03879, 105.82071],
[21.03882, 105.82076],
[21.03884, 105.82082],
[21.03884, 105.82088],
[21.03884, 105.82095],
[21.03883, 105.82102],
[21.03882, 105.8211],
[21.03881, 105.82119],
[21.0388, 105.82131],
[21.03874, 105.82193],
[21.03873, 105.82211],
[21.0387, 105.82263],
[21.03864, 105.82287],
[21.03844, 105.82336],
[21.03836, 105.82362],
[21.03831, 105.82387],
[21.0383, 105.82391],
[21.03828, 105.82404],
[21.03827, 105.82422],
[21.03827, 105.82436],
[21.03827, 105.82449],
[21.03826, 105.82461],
[21.03825, 105.82471],
[21.03823, 105.82481],
[21.0382, 105.82494],
[21.03818, 105.82501],
[21.03818, 105.82501],
[21.0382, 105.82501],
[21.0382, 105.82501]
];


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

    function updateService(dataTemporary) {
        let id = 2;
        for (let i = 0; i < dataTemporary.length; i++) {
            // console.log(dataTemporary[i][0], dataTemporary[i][1]);
            setTimeout(function () {
                // const gps = {
                //     id: id,
                //     lat: dataTemporary[i][0],
                //     long: dataTemporary[i][1]
                // }
                // socket.send(JSON.stringify(gps));
                console.log(dataTemporary[i][0], dataTemporary[i][1]);
                // setPosition((prev) => {
                //     const newPrev = [...prev];
                //     newPrev[0] = dataTemporary[i][0];
                //     newPrev[1] = dataTemporary[i][1];
                //     return newPrev;
                // });
            }, 1000 * i);
        }
    }

    // updateService(dataTemporary);

    // const vehicles = [
    //     {   
    //         id: 1,
    //         "brand" : "Huyndai",
    //         "code" : "HD260 6x4",
    //         "createdAt" : "2022-10-18T16:43:52.014Z",
    //         "emptyWeight" : 10886.217,
    //         "height" : 3240,
    //         "image" : "a.jpg",
    //         "latitude" : 21.093722,
    //         "length" : 9010,
    //         "licensePlate" : "29X3-00628",
    //         "longitude" : 105.682079,
    //         "maxSpeed" : 122,
    //         "maxWeight" : 14514.956,
    //         "name" : "HD260 6x4",
    //         "speed" : 40,
    //         "status" : "on-work",
    //         "updatedAt" : "2022-10-18T16:43:52.014Z",
    //         "weight" : 12312,
    //         "width" : 2490
    //     }
    // ]

    const bins = [
        {
            id: 1,
            "createdAt": "2022-10-18T16:17:55.740Z",
            "latitude": 21.0927815454556,
            "longitude": 105.68434334543,
            "maxWeight": 156,
            "height": "Bin 1",
            "status": "empty",
            "updatedAt": "2022-10-18T16:17:55.740Z",
            "weight": 123,
        }
    ]
    const vehicleUpdate = () => {
        const id = "634ed7c8ab18a79f5ddea831";
        // dispatch(putVehiclesDataAsync(id))
    }

    // vehicleUpdate();

    // console.log('vehicles', vehicles);
    // console.log('bins', bins);

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
                {!!bins && bins.map((bin) => (
                    <Marker key={bin.id} position={[bin.latitude, bin.longitude]} icon={iconBin}>
                    </Marker>
                ))}
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