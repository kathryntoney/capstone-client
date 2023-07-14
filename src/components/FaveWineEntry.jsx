import React from 'react'
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFavorite } from './auth/authSlice'

const FaveWineEntry = ({ favorite, userID }) => {
    const { picture, notes } = favorite
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('userID: ', userID)

    const handleRemoveFavorite = (e) => {
        e.preventDefault()
        const favoriteID = favorite.id
        const payload = { favoriteID, userID }
        console.log('favoriteID: ', favoriteID)
        dispatch(deleteFavorite(payload))
        window.location.reload();
    }


    let content = null;
    if (userID && userID === localStorage.getItem('userID')) {
        content = (
            <>
                <Card sx={{ margin: 5, backgroundColor: "#fdd5c1", height: { xs: "300", sm: "60%" } }} id={favorite.id}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={picture}
                        alt="wine picture"
                    />
                    <CardContent >
                        <Typography variant="body2" color="primary">
                            {notes}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <IconButton aria-label="add to favorites">
                            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'primary' }} />} />
                        </IconButton> */}
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={(e) => handleRemoveFavorite(e)} />
                        </IconButton>
                    </CardActions>
                </Card>
            </>
        )
    }

    return content
}

export default FaveWineEntry
