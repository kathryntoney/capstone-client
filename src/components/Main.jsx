import React, { useEffect } from 'react'
import { Box, Typography, Button, Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserID, setNavbar } from './auth/authSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5C374C', // dark purple
    },
    secondary: {
      main: '#FF8C61', // atomic tangerine
    },
    info: {
      main: '#fdd5c1'
    }
  },
});


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#5C374C', //dark purple
//     },
//     secondary: {
//       main: '#FF8C61' //atomic tangerine
//     },
//     info: {
//       main: '#fdd5c1' //light peach
//     }

//   },
// });

const StyledTypography = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: 'center',
  fontFamily: "'Nunito', sans - serif",

  marginTop: '10px'
})

const StyledButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '20px',
  margin: '5px',
  width: '80vw',

})

const Main = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.isLoading)
  const token = useSelector(state => state.token)
  const userID = useSelector(state => state.userID)
  const profilePic = useSelector(state => state.profilePic)
  const name = useSelector(state => state.name)
  console.log('state:', useSelector(state => state))
  console.log(userID, profilePic, name)
  console.log('main', userID)
  const navigate = useNavigate()
  console.log('main', token)

  useEffect(() => {
    if (!isLoading && token) {
      localStorage.setItem('token', token)
      localStorage.setItem('userID', userID)
      localStorage.setItem('profilePic', profilePic)
      localStorage.setItem('name', name)
    }
  }, [token, userID, profilePic, name])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ backgroundColor: "#fdd5c1", marginTop: "20%" }} >

            <StyledTypography color='primary' variant='h5' sx={{ display: 'flex', }}>What would you like to do?</StyledTypography>
            <br />
            <StyledButton variant='contained' href='/pairing'>Get help with a pairing</StyledButton>
            <br />
            <StyledButton variant='contained' href='/wines' userID={userID}>View wine list</StyledButton>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Main
