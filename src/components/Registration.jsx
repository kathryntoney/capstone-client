import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Cloudinary } from '@cloudinary/url-gen'
import Axios from 'axios'
import { signUp } from './auth/authSlice'

const StyledTextField = styled(TextField)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    fontFamily: "'Nunito', sans - serif",
    fontFamily: "'Roboto Mono', monospace",
    marginTop: '10px'
})

const Registration = (e) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [imageSelected, setImageSelected] = useState('')
    const isLoading = useSelector(state => state.isLoading)
    const token = useSelector(state => state.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // cloudinary
        console.log(imageSelected)
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("folder", 'pocketsomm-users')
        formData.append("upload_preset", "yhxzftqb")
        const response = await Axios.post("https://api.cloudinary.com/v1_1/ktprojects/image/upload", formData)
        console.log(response)
        console.log(response.data.url)
        const profilePicUrl = response.data.url
        setProfilePic(profilePicUrl)

        // end cloudinary
        const data = {
            name,
            email,
            password,
            profilePic: profilePicUrl
        }
        dispatch(signUp({ formData: data }))
        navigate('/')
    }

    useEffect(() => {
        if (!isLoading && token) {
            navigate('/')
        }
    }, [token])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <StyledTextField placeholder='username' onChange={(e) => setName(e.target.value)} />
                <StyledTextField type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <StyledTextField type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <p sx={{ color: '#5C374C' }}>Upload profile picture (optional):</p>
                <input type='file' onChange={(e) => { setImageSelected(e.target.files[0]) }}></input>
                <Button variant='contained' sx={{ backgroundColor: '#5C374C', marginTop: '5px' }} onClick={handleSubmit}>Submit</Button>
            </Box>
        </>
    )
}

export default Registration
