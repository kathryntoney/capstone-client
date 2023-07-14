import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Card, CardContent, ButtonGroup, TextField, Container, CircularProgress } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { removeDataUri } from './auth/authSlice';

const ariaLabel = { 'aria-label': 'description' };
const { Configuration, OpenAIApi } = require("openai");


const theme = createTheme({
  palette: {
    primary: {

      main: '#5C374C',
    },

  },
});

const OpenAI = ({ ocr }) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [dish, setDish] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(false)
  const dispatch = useDispatch()
  const dataUri = useSelector(state => state.dataUri.dataUri)
  const navigate = useNavigate()


  const handleBack = () => {
    dispatch(removeDataUri())
    navigate("/pairing")
  }


  const handleSubmit = async () => {

    setLoading(true);
    setLoadingProgress(true)

    try {

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Given these wines: ${ocr}. Which 2  would you recommend if I am eating ${dish}?`,
        temperature: 0.7,
        max_tokens: 2000,

      });

      setApiResponse(result.data.choices[0].text);
    } catch (err) {

      setApiResponse("Something is going wrong, Please try again.");
    }

    setLoading(false);
    setLoadingProgress(false)

  };
  return (
    <>
      <ThemeProvider theme={theme}>

        <Container>

          <Card sx={{ paddingBottom: "5%", backgroundColor: "#fdd5c1" }}>
            <Typography sx={{ marginLeft: "1%", color: "#5C374C" }} variant="h6">What dish would you like to pair?</Typography>
            <br />
            <TextField
              id="standard-search"
              label="Search dish"
              type="search"
              size="normal"
              variant="standard"
              sx={{ marginLeft: "1%", color: "#5C374C" }}
              inputProps={ariaLabel}
              onChange={(e) => setDish(e.target.value)}
            />

            {
              (loadingProgress) ?

                <CircularProgress />
                : <Button color="primary" onClick={handleSubmit} size="medium" variant='contained' aria-label='outlined button group' >submit</Button>
            }


          </Card>
        </Container>

        <br />
        <br />

        {
          (apiResponse) ?
            <Container>

              <Box>


                <Card sx={{ backgroundColor: "#fdd5c1" }}>

                  <CardContent>
                    <Typography
                      variant="h4"
                      sx={{ mb: "2.5", color: "#5C374C" }}>
                      Pairing Suggestions

                    </Typography>
                    <br />
                    <Typography
                      sx={{ fontSize: 16, fontFamily: 'Nunito', color: "#5C374C" }} >

                      {apiResponse}
                      <br />


                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <br />
              <Box>
                <Card sx={{ backgroundColor: "#fdd5c1" }}>
                  <ButtonGroup>
                    <Button sx={{ backgroundColor: "#5C374C", marginTop: "1.5%" }} variant='contained' aria-label='outlined button group' onClick={handleBack}>Back to Camera</Button>

                  </ButtonGroup>

                  <Typography sx={{ color: "#5C374C" }} >
                    <br />
                    Tip:search as many dishes as you wish while on this page without a new picture.</Typography>
                </Card>
              </Box>
            </Container> : <Box></Box>
        }

      </ThemeProvider>
    </>
  );
};
export default OpenAI;