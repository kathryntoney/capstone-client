import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const initialState = {
    token: "",
    userID: "",
    profilePic: "",
    name: "",
    favorites: [],
    error: "",
    isLoading: false,
    dataUri: ""
}

const SIGN_UP = "SIGN_UP" //action types
const SIGN_IN = "SIGN_IN" //action types
const CHECK_TOKEN = "CHECK_TOKEN" //action types
const ADD_WINE = "ADD_WINE"
const DISPLAY_FAVORITE = "DISPLAY_FAVORITE"
const SIGN_OUT = "SIGN_OUT"
const DELETE_FAVORITE = "DELETE_FAVORITE"


// pending, fullfilled, rejected

// {formData: }




export const signUp = createAsyncThunk(SIGN_UP, async (params, thunkAPI) => {

    let response = await axios.post('https://pocketsomm.onrender.com/registration', params.formData)

    let jwt = response.data.token



    return jwt

})

export const signIn = createAsyncThunk(SIGN_IN, async (params, thunkAPI) => {
    let response = await axios.post('https://pocketsomm.onrender.com/login', params.formData)
    let token = response.data.token
    console.log('signIn thunk', token)
    let userID = response.data.userID
    console.log('signIn thunk', userID)
    // thunkAPI.dispatch(setUserID(userID))
    let profilePic = response.data.profilePic
    console.log('signIn thunk', profilePic)
    let name = response.data.name
    console.log('signIn thunk', name)
    localStorage.setItem('token', token)
    localStorage.setItem('userID', userID)
    localStorage.setItem('profilePic', profilePic)
    localStorage.setItem('name', name)
    return { token, userID, profilePic, name }
})

export const checkToken = createAsyncThunk(CHECK_TOKEN, async (params, thunkAPI) => {
    if (localStorage.token) {
        let token = localStorage.token
        console.log('inside checkToken 1', token)
        //api to check if token is valid
        let response = await axios.get('https://pocketsomm.onrender.com/protected', {
            headers: {
                'authorization': token
            }
        })
        console.log('inside checkToken 2', response.data)
        return response.data
    }
    return { isValid: false }
})

export const displayFavorite = createAsyncThunk(DISPLAY_FAVORITE, async (params, thunkAPI) => {
    const userID = localStorage.userID
    console.log('display fave thunk', userID)
    const token = localStorage.token
    try {
        const response = await axios.get(`https://pocketsomm.onrender.com/wines/${userID}`, {
            headers: {
                Authorization: token,
            },
        })
        console.log('display favorite', response)
        return response.data
    } catch (error) {
        console.log('error displaying wine list: ', error)
        throw error
    }
})

export const addWine = createAsyncThunk(ADD_WINE, async (params, thunkAPI) => {
    try {
        const response = await axios.post('https://pocketsomm.onrender.com/addwine', params.formData)
        return response.data
    } catch (error) {
        console.log('error adding new wine: ', error)
        throw error
    }
})

export const deleteFavorite = createAsyncThunk(DELETE_FAVORITE, async ({ favoriteID, userID }, thunkAPI) => {
    try {
        console.log('inside delete favorite try')
        const response = await axios.delete(`https://pocketsomm.onrender.com/favorites/${favoriteID}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log('could not delete favorite', error)
        throw error
    }
})

let authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUserID: (state, action) => {
            state.userID = action.payload
        },

        // signOut: (state, action) => {
        //     // state.token = ""
        //     // state.profilePic = ""
        //     // state.name = ""
        //     // state.userID = ""
        //     // localStorage.removeItem('token')
        //     localStorage.clear()
        //     return initialState
        // },
        signOut: () => initialState,

        addDataUri: (state, action) => {
            state.dataUri = action.payload
        },

        removeDataUri: (state) => {
            state.dataUri = ""
        },
        setNavbar: (state, action) => {
            state.profilePic = action.payload.profilePic
            state.name = action.payload.name
            state.token = action.payload.token
            state.userID = action.payload.userID
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('profilePic', action.payload.profilePic)
            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('userID', action.payload.userID)
        },
        removeFavorite: (state, action) => {
            const favoriteID = action.payload
            state.favorites = state.favorites.filter(favorite => favorite.id !== favoriteID)
        }

    },
    extraReducers: {

        [signUp.pending]: (state, action) => {

            state.isLoading = true;

        },
        [signUp.fulfilled]: (state, { payload }) => {  //action.payload

            state.isLoading = false
            state.token = payload.token
            state.userID = payload.userID
            state.profilePic = payload.profilePic
            state.name = payload.name
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userID', payload.userID)
            localStorage.setItem('profilePic', payload.profilePic)
            localStorage.setItem('name', payload.name)
        },
        [signUp.rejected]: (state, action) => {

            state.isLoading = false;
            state.error = "Couldn't fetch data"
        },
        [signIn.pending]: (state, action) => {

            state.isLoading = true;

        },
        [signIn.fulfilled]: (state, { payload }) => {  //action.payload
            state.isLoading = false
            state.token = payload.token
            state.userID = payload.userID
            state.profilePic = payload.profilePic
            state.name = payload.name
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userID', payload.userID)
            localStorage.setItem('profilePic', payload.profilePic)
            localStorage.setItem('name', payload.name)
        },
        [signIn.rejected]: (state, action) => {

            state.isLoading = false;
            state.error = "Couldn't fetch data"
        },
        [checkToken.pending]: (state, action) => {

            state.isLoading = true;

        },
        [checkToken.fulfilled]: (state, { payload }) => {  //action.payload
            console.log('checkToken.fulfilled payload: ', payload)
            state.isLoading = false
            if (payload.isValid) {
                state.token = localStorage.token
                state.userID = localStorage.userID
                state.profilePic = localStorage.profilePic
                state.name = localStorage.name
                // localStorage.setItem('token', payload.token)
                // localStorage.setItem('userID', payload.userID)
                // localStorage.setItem('profilePic', payload.profilePic)
                // localStorage.setItem('name', payload.name)
            }
        },
        [checkToken.rejected]: (state, action) => {

            state.isLoading = false;
            state.error = "Couldn't fetch data"
            state.token = ""
        },
        [addWine.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addWine.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            if (payload.isValid) {
                state.token = localStorage.getItem('token', payload)
                state.userID = localStorage.userID
            }
        },
        [addWine.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = "couldn't add wine"
        },
        [displayFavorite.pending]: (state, action) => {
            state.isLoading = true;
        },
        [displayFavorite.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.favorites = payload.favoriteList
        },
        [displayFavorite.rejected]: (state, action) => {
            state.isLoading = false
            state.error = "couldn't display wines"
        },
        [deleteFavorite.pending]: (state) => {
            state.isLoading = true
        },
        [deleteFavorite.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            // state.favorites = payload.favoriteList
            state.favorites = payload
        },
        [deleteFavorite.rejected]: (state, action) => {
            state.isLoading = false
            state.error = "couldn't delete favorite"
        }
    }
})


export const { signOut } = authSlice.actions
export const { addDataUri } = authSlice.actions
export const { removeDataUri } = authSlice.actions
export const { setUserID } = authSlice.actions
export const { setNavbar } = authSlice.actions
export const { removeFavorite } = authSlice.actions

export default authSlice.reducer

