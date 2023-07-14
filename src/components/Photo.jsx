import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Camera, { IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import ImagePreview from './ImagePreview';
import { useNavigate } from 'react-router-dom'

import { AppBar, Toolbar, Card, Container, CardMedia, Typography, Box, TextField, ButtonGroup, Avatar, Modal, Button, CardActions } from '@mui/material'

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { addDataUri } from './auth/authSlice';
import '../assets/css/photo.css'

const Photo = (props) => {
  const [dataUri, setDataUri] = useState('');
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setOpen(true)


  }, [])

  function handleTakePhotoAnimationDone(dataUri) {
    setDataUri(dataUri);
    console.log(dataUri, "datauri photo")
    dispatch(addDataUri({ dataUri }))

    console.log('takePhoto');
  }

  const handleRetake = () => {
    setDataUri("")

  }
  const handleSubmit = () => {
    navigate('/suggestions')
  }


  // const isFullscreen = false
  return (
    <>
      <Modal
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginTop: "40%" }}
      >
        <Box width={350} height={280} bgcolor="#fdd5c1 " p={3} borderRadius={5}>
          <CameraAltIcon style={{ color: '#5C374C' }} fontSize='large' />
          <Typography variant='h5' color='#5C374C' textAlign='center'>Picture Tips</Typography>
          <TextField
            sx={{ width: '100%', color: '#5C374C' }}
            id='standard-multiline-static'
            rows={4}
            variant='standard'

          />
          <p style={{ color: '#5C374C' }}>Take a picture of <strong>one column</strong> of information</p>
          <p style={{ color: '#5C374C' }}>Steady the camera to minimize blur</p>
          <p style={{ color: '#5C374C' }}>Check you have adequate lighting</p>
          <p style={{ color: '#5C374C' }}>Avoid reflection or reflective surfaces</p>


          <ButtonGroup variant='contained' aria-label='outlined button group' fullWidth>

            <Button style={{ backgroundColor: '#5C374C' }} onClick={e => setOpen(false)}>Close</Button>
          </ButtonGroup>
        </Box>
      </Modal>
      {
        (dataUri)
          ? <Container>

            <Card sx={{ maxWidth: "100vw", height: "75vh", backgroundColor: "#fdd5c1" }}>
              <ImagePreview dataUri={dataUri} />
              <CardActions>

                <ButtonGroup>
                  <Button style={{ backgroundColor: '#5C374C' }} variant='contained' aria-label='outlined primary button group' onClick={handleRetake}>Retake </Button>
                  <Button sx={{ marginLeft: "3%", backgroundColor: '#5C374C' }} variant='contained' aria-label='outlined primary button group' onClick={handleSubmit}>Keep</Button>
                </ButtonGroup>
              </CardActions>
              <br />

            </Card>
          </Container> :
          <Container>

            <Card sx={{ backgroundColor: "#fdd5c1" }}>

              <Camera onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                isFullscreen={false}
                imageType={IMAGE_TYPES.JPG}
                imageCompression={0.97}
                isMaxResolution={true}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                idealResolution={{ width: 390, height: 844 }}

              />
            </Card>
          </Container>






      }




    </>
  )
}

export default Photo