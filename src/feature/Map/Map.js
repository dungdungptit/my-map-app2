import React, { Fragment, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { 
    getVehiclesDataAsync,
    vehiclesSelector 
} from "../../store/reducers/vehicleSlice";
import {
    getBinsDataAsync,
    binsSelector
} from "../../store/reducers/binSlice";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'


const Map = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector(vehiclesSelector);
    const bins = useSelector(binsSelector);

    console.log(vehicles);
    console.log(bins);

    useEffect(() => {
        dispatch(getVehiclesDataAsync())
        dispatch(getBinsDataAsync())
    }, [dispatch])

    const position = [21.57201, 105.61388];
    const iconXe = new L.Icon({ iconUrl: 'https://img.icons8.com/ios/50/000000/car.png', iconSize: [50, 50] });

    return (
        <Fragment>
            <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Routing /> */}
                <Marker position={position} icon={iconXe}>
                </Marker>
            </MapContainer>
            {/* car info */}
            <div className="vehicles-info">
                <h1>Thông tin xe</h1>
                <ul>
                    {vehicles !== undefined && vehicles.map(vehicle => (
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
           
        </Fragment>

    )
}

Map.propTypes = {
    vehicles: PropTypes.array.isRequired
}

export default Map