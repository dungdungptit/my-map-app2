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
import { useTranslation } from 'react-i18next';

const DriverItemNew = ({ state }) => {
  const { t } = useTranslation();
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
    navigate("/drivers");
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
              {state === "new" ? `${t("drivers.create")}` : `${t("drivers.edit")}`}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("drivers.home")}
                </Link>
                <Link underline="hover" color="inherit" href="/drivers">
                  {t("drivers.pageName")}
                </Link>
                <Typography color="text.primary">{state === "new" ? `${t("drivers.add")}` : `${driverItem.firstName} ${driverItem.lastName}`}</Typography>
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
                  {t("drivers.form.infomation")}
                </Typography>
                <TextField id="outlined-basic" label={t("drivers.table.firstName")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.firstName} onChange={handleInputChange} name="firstName" />
                <TextField id="outlined-basic" label={t("drivers.table.lastName")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.lastName} onChange={handleInputChange} name="lastName" />
                <TextField id="outlined-basic" label={t("drivers.table.email")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.email} onChange={handleInputChange} name="email" />
                <TextField id="outlined-basic" label={t("drivers.table.phone")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.phone} onChange={handleInputChange} name="phone" />
                <TextField id="outlined-basic" label={t("login.password")} type={"password"} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.password} onChange={handleInputChange} name="password" />

              </Box>


              {/* chosse image file and preview */}


            </Paper>

            <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
              <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                {t("drivers.table.gender")}
                </Typography>
                <TextField id="outlined-basic" label={t("drivers.table.gender")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.gender} onChange={handleInputChange} name="gender" />


                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                {t("drivers.table.dob")}
                </Typography>
                <TextField id="outlined-basic" label={t("drivers.table.dob")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={driverItem.dob} onChange={handleInputChange} name="dob" />


                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  {t("drivers.form.image")}
                  </Typography>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span"
                      endIcon={<AttachFileIcon />}
                      onClick={(e) => handleClick()}
                    >
                      {t("drivers.form.upload")}
                    </Button>
                  </label>
                  <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="user" style={{ display: "none" }} />

                  <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {state === "new" && driverItem.image && <img src={driverItem.image} alt="driver" width="220" height="220" />}
                    {state === "edit" && <img src={click ? `${driverItem.image}` : `${assetUrl}/user/${driverItem.image}`} alt="driver" width={220} height={220} />}
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ width: '100%', my: 1 }}>
                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                {t("drivers.form.save")}
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