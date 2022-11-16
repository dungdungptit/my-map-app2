import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Routing from './Routing';
import "leaflet-rotatedmarker";
import Button from '@mui/material/Button';
import {
  _getAngle,
} from './constants';

import { getVehiclesData } from '../../api/vehicle/vehicles';
import { getBinsData } from '../../api/bin/bins';
import { Stack } from 'react-bootstrap';
import { Alert, Box, Typography } from '@mui/material';
import TabPanelItem from './TabPanelItem';
import { useSnackbar } from 'notistack';
import { BASE_URL_SOCKET } from '../../ultils/socketApi';


const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();
  const { rotationAngle, rotationOrigin } = props;
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.options.rotationAngle = rotationAngle;
      marker.options.rotationOrigin = rotationOrigin;
    }
  }, [rotationAngle, rotationOrigin]);
  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );

});

const ws = new WebSocket(BASE_URL_SOCKET)

let connection_resolvers = [];
let checkConnection = () => {
  return new Promise((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) {
      resolve();
    }
    else {
      connection_resolvers.push({ resolve, reject });
    }
  });
}

ws.addEventListener('open', () => {
  connection_resolvers.forEach(r => r.resolve())
});


checkConnection().then(() => {
   
});


const Map1 = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [position, setPosition] = useState([21.0419, 105.821]);
  const [heading, setHeading] = useState(0);
  const [data, setData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bins, setBins] = useState([]);

  useEffect(() => {
    getBinsData().then((data) => {
      setBins(data);
    });
  }, []);

  useEffect(() => {
    getVehiclesData().then((data) => {
      setVehicles(data);
    });
  }, []);


  useEffect(() => {
    // receive data from server

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data received", data);
      if (data[0] !== "alert") {
        setData(data);
      }

      if (data[0] === "alert") {
        enqueueSnackbar(JSON.stringify(data),
          {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            autoHideDuration: 3000,
            content: (key, message) => (
              <Alert
                key={key}
                message={message}
                severity="error"
                color="error"
                onClose={() => closeSnackbar(key)}
                sx={{ width: "240px" }}
                icon={false}
              >
                <Stack spacing={2} direction="row">
                  <Typography variant='caption' component='div'>
                     <strong>Event: </strong> {data[2]}
                  </Typography>
                    <Typography variant='caption' component='div'>
                    <strong>Position:</strong> {data[1].latitude.toFixed(4) + " " + data[1].longitude.toFixed(4)}
                  </Typography>
                    <Typography variant='caption' component='div'>
                    <strong>Time:</strong> {data[1].updatedAt.slice(0, 19).replace("T", " ")}
                  </Typography>
                </Stack>
              </Alert>
            ),
          });
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      //   console.log(angle);
      // }

    }

  }, []);

console.log('vehicles', vehicles);
if (!!vehicles && vehicles.length > 0) {
  let vehicle = vehicles.find(item => item.id.toString() === data[0]);
  // console.log("vehicle", vehicle);
  if (vehicle) {
    let oldLat = vehicle.latitude;
    let oldLong = vehicle.longitude;
    const angle = _getAngle(oldLat, oldLong, data[1], data[2]);
    console.log(angle);
    if (Math.abs(angle) !== 90) {
      const vehicleData = {
        ...vehicle,
        latitude: data[1],
        longitude: data[2],
        angle: angle
      }
      console.log("vehicleData", vehicleData);
      const vehiclesUpdate = [...vehicles.filter(item => item.id.toString() !== data[0]), vehicleData];
      setVehicles(vehiclesUpdate);
    }
  }
}

console.log('bins', bins);

// socket.onclose = () => {
//   console.log('Disconnected from server')
// }

const [open, setOpen] = useState(false);
const [item, setItem] = useState({});

const handleClickOpen = (e, item) => {
  setOpen(true);
  setItem(item);
  console.log(open);

};

const handleClose = (e) => {
  setOpen(false);
  setItem({});
  console.log(open);
};

const handleClick = event => {
  console.log(event);
}

const iconxeUrl = "https://scontent.xx.fbcdn.net/v/t1.15752-9/312898210_479470934235865_1699974428241662221_n.png?_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=4KmslLdAsNMAX-TC_mr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRVkybhk1urBp_jJcCfL3yLhKCRog3jZNV5wDDFlESHAg&oe=6380A4C1";
const iconXe = new L.Icon({ iconUrl: iconxeUrl, iconSize: [35, 16], className: "leaflet-rotated-icon-cua-dung" });
const iconBinUrl = "https://scontent.xx.fbcdn.net/v/t1.15752-9/274681202_1354205045055853_5026569908981328898_n.png?_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=AN8W4M5LsJ4AX-zEGfg&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRLjU48Us8TJxkav0iT9hxTfS2-3QHxc6Dj0auprQ3uBg&oe=638B13FA";
const iconBin = new L.Icon({ iconUrl: iconBinUrl, iconSize: [16, 24] })

return (
  <Fragment>
    <Box sx={{ position: 'relative', with: '100%' }}>
      <Box sx={{ height: "calc(100vh - 64px - 5px)" }}>
        <MapContainer center={[21.023396, 105.850094]} zoom={17} style={{ height: "inherit" }}>
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          />
          {/* <Polyline pathOptions={{ color: 'black' }} positions={dataTemporary} /> */}
          {/* {data[0] === "alert" &&
              <Routing from={data[1]} to={data[2]} />
            } */}
          {!!vehicles && vehicles.map((vehicle) => (
            <RotatedMarker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={iconXe} rotationOrigin="center" rotationAngle={vehicle.angle}
            // eventHandlers={{
            //   click: (e) => { handleClickOpen(e) },
            // }}
            >
              <Popup>
                <Stack spacing={0} direction="row" alignitems="flex-start">
                  {/* format %.6f */}
                  <p><strong>Position:</strong> {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}</p>
                  <p><strong>Angle:</strong> {vehicle.angle}</p>
                  <p><strong>Speed:</strong> {vehicle.speed}</p>
                  <p><strong>License Plate:</strong> {vehicle.plate}</p>
                  <p><strong>Status:</strong> {vehicle.status}</p>

                  <Button variant="contained" color="primary" onClick={(e, item) => handleClickOpen(e, { ...vehicle, type: 'vehicle' })}>
                    Click me to open dialog
                  </Button>
                </Stack>
              </Popup>
            </RotatedMarker>
          ))}

          {!!bins && bins.map((bin) => (
            <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={iconBin}>
              <Popup>
                <Stack spacing={0} direction="row" alignitems="flex-start">
                  <p><strong>Position:</strong> {bin.latitude.toFixed(6)}, {bin.longitude.toFixed(6)}</p>
                  <p><strong>Weight:</strong> {bin.weight}</p>
                  <p><strong>Max Weight:</strong> {bin.maxWeight}</p>
                  <p><strong>Status:</strong> {bin.status}</p>
                  <Button variant="contained" color="primary" onClick={(e, item) => handleClickOpen(e, { ...bin, type: 'bin' })}>
                    Click me to open dialog
                  </Button>
                </Stack>
              </Popup>
            </RotatedMarker>
          ))}
        </MapContainer>
      </Box>
      <Box sx={{
        width: "100%",
        height: open ? "274px" : 0,
        backgroundColor: open ? "white" : "#f5f5f5",
        position: 'absolute',
        bottom: 0,
        zIndex: 400,
        transition: "height 0.3s ease-in-out",
      }}>
        <TabPanelItem open={open} handleClose={handleClose} item={item} ></TabPanelItem>
      </Box>
    </Box>
  </Fragment>
)
}


export default Map1