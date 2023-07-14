import React, { useEffect, useState } from 'react'
import { Box, Typography, Card } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import AddWine from './AddWine'
import FaveWineEntry from './FaveWineEntry'
import { useNavigate } from 'react-router-dom'
import { checkToken, displayFavorite } from '../components/auth/authSlice'

const Wines = () => {
    const isLoading = (state => state.isLoading)
    const token = useSelector(state => state.token)
    const favoriteList = useSelector(state => state.favorites)
    const userID = useSelector(state => state.userID)
    const profilePic = useSelector(state => state.profilePic)
    const name = useSelector(state => state.name)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(checkToken());
                // console.log('inside fetch data', userID)
                await dispatch(displayFavorite(userID, profilePic, name));
            } catch (error) {
                console.log("couldn't fetch data")
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Box flex={4} p={2}>
            {favoriteList.length > 0 ? (
                favoriteList.map((favorite) => (
                    <FaveWineEntry
                        key={favorite.id}
                        picture={favorite.picture}
                        notes={favorite.notes}
                        userID={userID}
                        favorite={favorite}
                    />
                ))
            ) : (
                <Card sx={{ backgroundColor: "#fdd5c1", marginTop: "20%" }}>
                    <Typography variant="h5" sx={{ fontFamily: "", display: 'flex', justifyContent: 'center', color: "#5C374C", textAlign: 'center' }}>
                        Use the button below to begin adding favorites!
                    </Typography>
                </Card>



            )}
            {/* {Array.isArray(favoriteList) ? (
                favoriteList.map((favorite) => (
                    <FaveWineEntry
                        key={favorite.id}
                        picture={favorite.picture}
                        notes={favorite.notes}
                        userID={userID}
                        favorite={favorite}
                    />
                ))
            ) : (
                <p>Use the button below to start adding favorites!</p>
            )} */}
            {/* {favoriteList.map(favorite => (
                <FaveWineEntry
                    key={favorite.id}
                    picture={favorite.picture}
                    notes={favorite.notes}
                    userID={userID}
                    favorite={favorite}
                />
            ))} */}
            <AddWine />
        </Box>
    )
}

export default Wines
