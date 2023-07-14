import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';


import authSlice from './components/auth/authSlice';
import BaseLayout from './components/layout/BaseLayout';
import Pairing from './components/Pairing';

import DisplayWines from './components/DisplayWines';
import Main from './components/Main';
import RequireAuth from './components/RequireAuth';
import MenuReader from './components/MenuReader';
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  palette: {
    primary: {

      main: '#5C374C', //dark purple
    },
    secondary: {
      main: '#FF8C61' //atomic tangerine
    },
    info: {
      main: '#fdd5c1 ' //light peach
    }

  },
});
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
  reducer: persistedReducer,
  devTools: {
    shouldSerialize: false
  }
});
const persistor = persistStore(store);

export { store, persistor };

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <BaseLayout>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<RequireAuth><Main /></RequireAuth>} />
                <Route path='/wines' element={<DisplayWines />} />
                <Route path='/pairing' element={<Pairing />} />
                <Route path='/suggestions' element={<MenuReader />} />
              </Routes>
            </BaseLayout>
          </Router>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

