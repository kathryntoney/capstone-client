import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Tooltip, Fab, Modal, Box, Typography, Avatar, TextField, Stack, ButtonGroup, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Axios from 'axios'
import { addWine } from './auth/authSlice'

const theme = createTheme({
    palette: {
        primary: {

            main: '#5C374C',
        },
        secondary: {
            main: '#FF8C61'
        },
        info: {
            main: '#fdd5c1 '
        }

    },
});

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#fdd5c1'
})

const AddWine = () => {
    const [open, setOpen] = useState(false)
    const [picture, setPicture] = useState('')
    const [imageSelected, setImageSelected] = useState('')
    const [notes, setNotes] = useState('')
    const isLoading = useSelector(state => state.isLoading)
    const token = useSelector(state => state.token)
    // const userID = localStorage.getItem('userID')
    // console.log('userID', userID)
    const userID = useSelector(state => state.userID)
    const profilePic = useSelector(state => state.profilePic)
    const name = useSelector(state => state.name)
    // console.log('add wine', userID)
    // console.log('addwine ', token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(imageSelected)
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("folder", 'pocketsomm-wines')
        formData.append("upload_preset", "yhxzftqb")
        const picture = await Axios.post("https://api.cloudinary.com/v1_1/ktprojects/image/upload", formData)
        // console.log(picture.data.url)
        const pictureURL = picture.data.url
        setPicture(pictureURL)
        const data = {
            userID: userID,
            picture: pictureURL,
            notes
        }
        // console.log('dataset: ', data)
        setOpen(false)
        dispatch(addWine({ formData: data }))
        // navigate('/wines')
        window.location.reload()
    }

    return (
        <>

            <ThemeProvider theme={theme}>
                <Tooltip onClick={e => setOpen(true)} title='New Post' sx={{ position: 'fixed', bottom: 50, left: { xs: "calc(50% - 25px)", md: 30, color: "#5C374C" } }}>
                    <Fab color='secondary' aria-label='add'>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <StyledModal
                    open={open}
                    onClose={e => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box width={400} height={280} bgcolor="#fdd5c1" p={3} borderRadius={5}>
                        <Typography variant='h6' color='primary' textAlign='center'>Create Post</Typography>
                        <Box>
                            <Avatar src={profilePic}
                                sx={{ width: 30, height: 30 }} />
                            <Typography fontWeight={500} variant='span'>{name}</Typography>

                        </Box>
                        <TextField
                            sx={{ width: '100%', backgroundColor: "#fdd5c1", padding: "2%" }}
                            id='standard-multiline-static'
                            rows={4}
                            placeholder="Enter notes about your wine here"
                            variant='standard'
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <input style={{ padding: "3%" }} type='file' onChange={(e) => { setImageSelected(e.target.files[0]) }}></input>

                        <ButtonGroup variant='contained' aria-label='outlined button group' fullWidth>

                            <Button onClick={handleSubmit}>Submit</Button>
                            <Button onClick={e => setOpen(false)}>Cancel</Button>
                        </ButtonGroup>

                    </Box>
                </StyledModal>
            </ThemeProvider>
        </>
    )
}

export default AddWine
