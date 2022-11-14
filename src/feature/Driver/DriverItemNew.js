import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import {
  postDriverDataAsync,
  putDriverDataAsync,
  getDriverDataById
} from '../../store/reducers/driverSlice';
import { assetUrl } from '../../ultils/axiosApi';

const DriverItemNew = ({ state }) => {
  // state = "new" or "edit"
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log("Params:", params);
  console.log("Location:", location);
  const dispatch = useDispatch();

  let [click, setClick] = useState(false);

  const handleClick = (e) => {
    setClick(true);
  }
  // convert driverId to number
  const driverId = parseInt(params.driverId);

  const [driverItem, setDriverItem] = useState(
    {
      id: 0,
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      image: "",
    }
  );

  useEffect(() => {
    if (state === "edit") {
      getDriverDataById(driverId).then((result) => {
        console.log("Result:", result);
        setDriverItem(result);
      });
    }
  }, [])

  console.log("DriverItem:", driverItem);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriverItem({ ...driverItem, [name]: value });
  }

  const handleInputChangeImage = (event) => {
    const { name, value } = event.target;
    setDriverItem({ ...driverItem, [name]: URL.createObjectURL(event.target.files[0]) });
  }

  const handleSave = (event) => {
    event.preventDefault();
    const formDriver = document.getElementById("formDriver");
    const formData = new FormData(formDriver);
    if (state === "new") {
      dispatch(postDriverDataAsync(formData));
    }
    else if (state === "edit") {
      dispatch(putDriverDataAsync({ formData, driverId }));
    }
    // navigate("/drivers");
  }

  return (
    <Box>
      <Fragment>
        <Box sx={{
          height: 'auto',
          py: 4,
          pt: 6,
          px: 2,
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
              {state === "new" ? "Create new driver" : "Edit driver"}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="/drivers">
                  Drivers
                </Link>
                <Typography color="text.primary">{state === "new" ? "New driver" : `${driverItem.firstName} ${driverItem.lastName}`}</Typography>
              </Breadcrumbs>
            </Typography>

            {/* Edit problem item */}
          </Stack>

          {/*  form multipart */}
          <Stack id='formDriver' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
            onSubmit={handleSave}
          >
            <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  Driver information
                </Typography>
                <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.firstName} onChange={handleInputChange} name="firstName" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.lastName} onChange={handleInputChange} name="lastName" />
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.email} onChange={handleInputChange} name="email" />
                <TextField id="outlined-basic" label="Phone" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.phone} onChange={handleInputChange} name="phone" />
                <TextField id="outlined-basic" label="Password" type={"password"} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.password} onChange={handleInputChange} name="password" />

              </Box>


              {/* chosse image file and preview */}


            </Paper>

            <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
              <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  Gender
                </Typography>
                <TextField id="outlined-basic" label="Gender" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.gender} onChange={handleInputChange} name="gender" />


                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  Date of Birth
                </Typography>
                <TextField id="outlined-basic" label="Date of Birth" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.dob} onChange={handleInputChange} name="dob" />


                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                    Image
                  </Typography>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span"
                      endIcon={<AttachFileIcon />}
                      onClick={(e) => handleClick()}
                    >
                      Upload
                    </Button>
                  </label>
                  <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="image" style={{ display: "none" }} />

                  <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {state === "new" && driverItem.image && <img src={driverItem.image} alt="driver" width="220" height="220" />}
                    {state === "edit" && <img src={click ? `${driverItem.image}` : `${assetUrl}${driverItem.image}`} alt="driver" width={220} height={220} />}
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ width: '100%', my: 1 }}>
                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          </Stack>



        </Box>
      </Fragment >
    </Box >
  )
}

export default DriverItemNew