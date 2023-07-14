import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'



const Footer = () => {
  return (
   
     <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      
    
        <Box sx={{textAlign:"center"}}>
  

            <Typography sx={{fontSize:"11px", color:"#FF8C61", textAlign:"center", padding:"3%"}}>created by: Kathryn Toney & Kelly Henderson</Typography>

         
       </Box>

        
        
       
        
      </AppBar>
    
  )
}

export default Footer