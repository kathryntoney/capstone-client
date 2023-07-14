import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, TextField, Modal, Button, Container, Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import Registration from './Registration'
import { useNavigate } from 'react-router-dom'
import { signIn, checkToken } from './auth/authSlice'

const StyledTextField = styled(TextField)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    fontFamily: "'Nunito', sans - serif",
    fontFamily: "'Roboto Mono', monospace",
    marginTop: '10px'
})

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
})

const Login = () => {
    const [openRegistration, setOpenRegistration] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoading = (state => state.isLoading)
    const token = useSelector(state => state.token)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = {
            formData: {
                email,
                password
            }
        }
        console.log(data)
        dispatch(signIn(data)).then((response) => {
            dispatch(checkToken(response.payload))
            navigate('/')
        })
    }

    return (
        <Container>
            <Card sx={{backgroundColor:"#fdd5c1", marginTop:"20%" }}>

            <Typography variant='h5' sx={{ fontFamily:"", display: 'flex', justifyContent: 'center', marginTop: '10px', color:"#5C374C" }}>Login:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <StyledTextField  type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
                <StyledTextField type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
                <Button  variant='contained' sx={{ margin: '10px', backgroundColor:'#5C374C' }} onClick={handleSubmit} >Submit</Button>
            </Box>
            <Box>
                <Typography variant='h5' sx={{ fontFamily: "'Nunito', sans - serif", display: 'flex', justifyContent: 'center', marginTop: '10px', color:'#5C374C' }}><a href='#' onClick={e => setOpenRegistration(true)}>First time here?</a></Typography>
                <StyledModal
                    open={openRegistration}
                    onClose={e => setOpenRegistration(false)}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                    >
                    <Box width={400} height={350} bgcolor='#fdd5c1' p={3} borderRadius={5}>
                        <Typography sx={{color:'#5C374C'}} variant='h6' textAlign='center'>Register Now:</Typography>
                        <Registration />
                    </Box>
                </StyledModal>
            </Box>
         </Card>
                   
        </Container>
    )
}

export default Login
