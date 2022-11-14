import { Button, FormControl, FormLabel, Input } from '@mui/material'
import { Stack } from '@mui/system'
import { React, useState } from 'react'

const Login = () => {
    const [user, setUser] = useState({
        phone: '',
        password: '',
    })
  return (
    <Stack spacing={3} sx={{
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
    }}>
        <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
        </FormControl>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </FormControl>
        <Button variant='outlined' onClick={() => console.log(user)}>Login</Button>
    </Stack>
  )
}

export default Login