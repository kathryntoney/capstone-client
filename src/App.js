// import './App.css';
import Leftbar from './components/Leftbar';
import Main from './components/Main'
import Rightbar from './components/Rightbar';
import Navbar from './components/Navbar';
import AddPost from './components/AddWine';
import Footer from './components/Footer';

import { Box, Stack } from '@mui/material'









function App() {

  return (
  
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Leftbar />
        <Main />
      </Stack>
      <AddPost />
      <Footer />
    </Box>
   
  );
}

export default App;
