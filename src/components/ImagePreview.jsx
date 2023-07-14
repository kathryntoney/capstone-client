import React, {useState} from 'react'

import PropTypes from 'prop-types';
import '../assets/css/imagePreview.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import MenuReader from './MenuReader';
const ariaLabel = { 'aria-label': 'description' };

export const ImagePreview = ({ dataUri }) => {
  const [dish, setDish] = useState('')



  // let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';
    return (
     <div>

    
 {/* <Card className='demo-image-preview' sx={{ maxWidth: "100vw", height:"75vh" }}> */}
 <CardMedia
 className='demo-image-preview'
 sx={{ maxWidth: "100vw", height:"65vh" }}
   component="img"
   alt="image preview"
   height="80%"
   image={dataUri}
 />


  
{/* </Card> */}

</div> 
    );
  };
  
  ImagePreview.propTypes = {
    dataUri: PropTypes.string,
    isFullscreen: PropTypes.bool
  };
  
  export default ImagePreview;