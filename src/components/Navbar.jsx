import '../index.css';
import '../assets/css/navBar.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Box, Avatar, Badge, Menu, MenuItem, Link } from '@mui/material'

import { styled } from '@mui/material/styles'
import WineBar from '@mui/icons-material/WineBar';

import { signOut } from './auth/authSlice';

import { createTheme, ThemeProvider } from '@mui/material/styles'


// const theme = createTheme({
//   palette: {
//     primary: {

//       main: '#5C374C', //dark purple
//     },
//     secondary: {
//       main: '#FF8C61' //atomic tangerine
//     },
//     info: {
//       main: '#fdd5c1 ' //light peach
//     }

//   },
// });

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: '#5C374C',
  fontFamily: "'Nunito', sans - serif",
  fontFamily: "'Roboto Mono', monospace"
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fdd5c1",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}))

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  [theme.breakpoints.up("sm")]: {
    display: 'flex'
  }
}))

const UserBox = styled(Box)(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up("sm")]: {
    display: 'none'
  }
}))

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    backgroundColor: "#fdd5c1" // Replace 'your-color' with the desired background color
  }
})


const Navbar = () => {
  const profilePic = useSelector(state => state.profilePic)
  // const profilePic = localStorage.getItem('profilePic')
  console.log('profilePic: ', profilePic)
  const name = useSelector(state => state.name)
  // const name = localStorage.getItem('name')
  console.log('username: ', name)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePairing = () => {
    navigate('/pairing')
    setOpen(false)
  }

  const handleWines = () => {
    navigate('/wines')
    setOpen(false)
  }

  const handleSignout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userID')
    localStorage.removeItem('profilePic')
    localStorage.removeItem('name')
    dispatch(signOut())
    navigate('/login')
    setOpen(false)
  }



  return (

    <AppBar position="sticky" >
      <StyledToolbar>
        <Link href='/'>
          <Typography className='navbar-title' variant='span' sx={{ fontSize: '25px', fontWeight: 'bold', color: '#FAA275', justifyContent: 'center', alignItems: 'center' }}><WineBar />Pocket Somm</Typography>
        </Link>
        <Icons>
          <Badge sx={{ ml: '5px' }}>
            <Avatar onClick={e => setOpen(true)} src={profilePic || ""} />
          </Badge>
        </Icons>
        <UserBox onClick={e => setOpen(true)}>
          <Avatar src={profilePic || ""} />
          <Typography sx={{ display: { xs: "none", sm: "block" } }} variant="span">{name || ""}</Typography>
        </UserBox>
      </StyledToolbar>
      <StyledMenu

        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        open={open}
        onClose={e => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',

        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}

      >



        <MenuItem sx={{ color: '#5C374C' }} onClick={handlePairing} >Pairing</MenuItem>
        <MenuItem sx={{ color: '#5C374C' }} onClick={handleWines} >My Wines</MenuItem>
        <MenuItem sx={{ color: '#5C374C' }} onClick={handleSignout} >Logout</MenuItem>

      </StyledMenu>
    </AppBar>
  )
}

export default Navbar
