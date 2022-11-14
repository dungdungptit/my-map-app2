import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Appbar from '../Header/Appbar'
import Header from '../Header/Header'

const PageWrapper = () => {
    return (
        <Box sx={{flexGrow: 11}}>
            <Header />
            {/* <Appbar /> */}
            <Outlet />
        </Box>
    )
}

export default PageWrapper