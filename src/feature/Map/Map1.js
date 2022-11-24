import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl, LayerGroup, useMapEvent, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Routing from './Routing';
import "leaflet-rotatedmarker";
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
import { useTranslation } from 'react-i18next';

import { green_bin, red_bin, yellow_bin, green_vehicle } from './constant';
import { useDispatch, useSelector } from 'react-redux';
import { addNoti, countSelector, increment, notiSelector, positionSelector } from '../../store/reducers/notiSlice';

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

const AutoIconMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();
  const { icon } = props;
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.options.icon = icon;
    }
  }, [icon]);
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

// const AutoStateMarker = ({ position, rotationAngle, rotationOrigin, icon, children }) => {
//   const [state, setState] = useState({
//     position,
//     rotationAngle,
//     rotationOrigin,
//     icon,
//   });
//   useEffect(() => {
//     setState({
//       position,
//       rotationAngle,
//       rotationOrigin,
//       icon,
//     });
//   }, [position, rotationAngle, rotationOrigin, icon]);
//   return <RotatedMarker {...state}>{children}</RotatedMarker>;
// };

// WebSocket init
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
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [position, setPosition] = useState([21.0419, 105.821]);
  const [heading, setHeading] = useState(0);
  const [data, setData] = useState([]);
  const [dataAlert, setDataAlert] = useState([]);
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

  const dispatch = useDispatch();

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
                    <strong>{t("map.event")}: </strong> {data[2]}
                  </Typography>
                  <Typography variant='caption' component='div'>
                    <strong>{t("vehicles.form.position")}:</strong> {data[1].latitude.toFixed(4) + " " + data[1].longitude.toFixed(4)}
                  </Typography>
                  <Typography variant='caption' component='div'>
                    <strong>{t("tableLog.time")}:</strong> {data[1].updatedAt.slice(0, 19).replace("T", " ")}
                  </Typography>
                </Stack>
              </Alert>
            ),
          });

        setDataAlert(data);
        dispatch(addNoti(data));
        dispatch(increment());
      }
      // const angle = _getAngle(position[0], position[1], data[1], data[2]);
      // if (Math.abs(angle) !== 90) {
      //   setPosition([data[1], data[2]]);
      //   setHeading(angle);
      //   console.log(angle);
      // }

    }

  }, []);

  // console.log('vehicles', vehicles);
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

  // console.log('bins', bins);
  useEffect(() => {
    if (dataAlert[0] === "alert") {
      // console.log("alert", dataAlert);
      if (!!bins && bins.length > 0) {
        let bin = bins.find(item => item.id.toString() === dataAlert[1].id.toString());
        if (bin) {
          const binData = {
            ...bin,
            status: dataAlert[1].status
          }
          // console.log("bin", binData);
          const binsUpdate = [...bins.filter(item => item.id.toString() !== dataAlert[1].id.toString()), binData];
          setBins(binsUpdate);
        }
      }

    }
  }, [dataAlert]);

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

  const iconxeUrl = green_vehicle;
  const iconXe = new L.Icon({ iconUrl: iconxeUrl, iconSize: [35, 16], className: "leaflet-rotated-icon-move-smoothing" });
  const iconBinGreenUrl = green_bin;
  const iconBinRedUrl = red_bin;
  const iconBinYellowUrl = yellow_bin;
  const iconBinGreen = new L.Icon({ iconUrl: iconBinGreenUrl, iconSize: [16, 24] })
  const iconBinRed = new L.Icon({ iconUrl: iconBinRedUrl, iconSize: [16, 24] })
  const iconBinYellow = new L.Icon({ iconUrl: iconBinYellowUrl, iconSize: [16, 24] })

  const [positionView, setPositionView] = useState([21.023396, 105.850094]);
  const positionEvent = useSelector(positionSelector);
  console.log("positionEvent", positionEvent);

  useEffect(() => {
    if (positionEvent) {
      setPositionView([positionEvent.latitude, positionEvent.longitude]);

    }
  }, [positionEvent]);
  return (
    <Fragment>
      <Box sx={{ position: 'relative', with: '100%' }}>
        <Box sx={{ height: "calc(100vh - 64px - 5px)" }}>
          <MapContainer center={[21.023396, 105.850094]} zoom={17} style={{ height: "inherit" }} scrollWheelZoom={false}>
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            {/* <Polyline pathOptions={{ color: 'black' }} positions={dataTemporary} /> */}
            {/* {data[0] === "alert" &&
            } */}
            {/* {!!vehicles && !!bins && <Routing from={[vehicles[3].latitude, vehicles[3].longitude]} to={[bins[5].latitude, bins[5].longitude]} />} */}

            {!!vehicles && vehicles.map((vehicle) => (
              <RotatedMarker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={iconXe} rotationOrigin="center" rotationAngle={vehicle.angle}
              // eventHandlers={{
              //   click: (e) => { handleClickOpen(e) },
              // }}
              >
                <Popup>
                  <Stack spacing={0} direction="row" alignitems="flex-start">
                    {/* format %.6f */}
                    <p><strong>{t("vehicles.form.position")}:</strong> {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}</p>
                    <p><strong>{t("vehicles.form.angle")}:</strong> {vehicle.angle}</p>
                    <p><strong>{t("vehicles.form.speed")}:</strong> {vehicle.speed}</p>
                    <p><strong>{t("vehicles.form.plate")}:</strong> {vehicle.plate}</p>
                    <p><strong>{t("vehicles.form.status")}:</strong> {vehicle.status}</p>

                    <Typography variant="body2" color="#2b82d4" component="p"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                      onClick={(e, item) => handleClickOpen(e, { ...vehicle, type: 'vehicle' })}>
                      {t("vehicles.detailed")}
                    </Typography>
                  </Stack>
                </Popup>
              </RotatedMarker>
            ))}

            {!!bins && bins.map((bin) => (
              <RotatedMarker key={bin.id} position={[bin.latitude, bin.longitude]} icon={bin.status === "full" ? iconBinRed : bin.status === "empty" ? iconBinGreen : iconBinYellow}>
                <Popup>
                  <Stack spacing={0} direction="row" alignitems="flex-start">
                    <p><strong>{t("bins.form.position")}:</strong> {bin.latitude.toFixed(6)}, {bin.longitude.toFixed(6)}</p>
                    <p><strong>{t("bins.table.weight")}:</strong> {bin.weight}</p>
                    <p><strong>{t("bins.table.maxWeight")}:</strong> {bin.maxWeight}</p>
                    <p><strong>{t("bins.table.status")}:</strong> {bin.status}</p>
                    <Typography variant="body2" color="#2b82d4" component="p"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                      onClick={(e, item) => handleClickOpen(e, { ...bin, type: 'bin' })}>
                      {t("vehicles.detailed")}
                    </Typography>

                  </Stack>
                </Popup>
              </RotatedMarker>
            ))}


            {/* <LayersControl position="topright">
              <LayersControl.Overlay name="Marker with popup">

              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Layer group with circles">
                <LayerGroup>


                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Feature group">

              </LayersControl.Overlay>
            </LayersControl> */}
          </MapContainer>
        </Box>
        <Box sx={{
          width: "100%",
          height: open ? "274px" : 0,
          backgroundColor: open ? "white" : "#f5f5f5",
          position: 'absolute',
          bottom: 0,
          zIndex: 1001,
          transition: "height 0.3s ease-in-out",
        }}>
          <TabPanelItem open={open} handleClose={handleClose} item={item} ></TabPanelItem>
        </Box>
      </Box>
    </Fragment>
  )
}


export default Map1