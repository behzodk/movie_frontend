import * as React from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://jizzakhps.uz">
        MyMovies
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#f6c800',
      },
    },
});
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="Minutes: "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function CreateMovie() {
  const [genres2, setGenres] = React.useState([]);
  const [rating, setRating] = React.useState(2);
  const [date, setDate] = React.useState();
  const navigate = useNavigate();
  // const [selectedGenre,setSelectedGenre] = React.useState()
  React.useEffect(() => {
    axios.get('https://behzod2006.pythonanywhere.com/genres/')
      .then((response) => {
        setGenres(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, []);
  const [minutes, setMinutes] = React.useState({
    numberformat: '120',
  });

  const [posterFile, setPosterFile] = React.useState()
  const uploadHandler = (event) => {
    const file = event.target.files[0]
    if(!file) return;
    setPosterFile(file)
  }
  const [backdropFile, setBackdropFile] = React.useState()
  const uploadHandler2 = (event) => {
    const file = event.target.files[0]
    if(!file) return;
    setBackdropFile(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form_data = new FormData();
    form_data.append('poster_image', posterFile, posterFile.name);
    form_data.append('backdrop_image', backdropFile, backdropFile.name);
    form_data.append('title', data.get('movieTitle'));
    form_data.append('trailer', data.get('trailer'));
    form_data.append('director', data.get('directorName'));
    form_data.append('tagline', data.get('tagline'));
    form_data.append('synopsis', data.get('synopsis'));
    form_data.append('rating', data.get('rating'));
    form_data.append('runtime_minutes', minutes.runtimeMinutes);
    form_data.append('release_date', dayjs(date).format('YYYY-MM-DD'));
    form_data.append('is_popular', data.get('popular') ? true : false);
    form_data.append('is_watched', data.get('watched') ? true : false);
    form_data.append('is_now_playing', data.get('coming') ? true : false);
    form_data.append('watch_list', data.get('watch_list') ? true : false);
    axios.post("https://behzod2006.pythonanywhere.com/movies/create/", form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res);
          navigate("/");
        })
        .catch(err => console.log(err))
  };

  const handleMinutes = (event) => {
    setMinutes({
      ...minutes,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AddBoxOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Movie
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  name="movieTitle"
                  required
                  fullWidth
                  id="movieTitle"
                  label="Movie Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="directorName"
                  label="Director Name"
                  name="directorName"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-multiline-static"
                  label="Tagline"
                  name="tagline"
                  rows={4}
                  multiline
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-multiline-static"
                  label="Synopsis"
                  name="synopsis"
                  rows={4}
                  multiline
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
              {genres2.length > 0 && (
                <Autocomplete
                  multiple
                  name="genre"
                  id="genres"
                  options={genres2.map((option) => option.name)}
                  // value={selectedGenre}
                  renderInput={(params) => (
                    <TextField {...params} label="Genres" placeholder="Genres" name="genre" />
                  )}
                />
              )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Trailer URL"
                  name='trailer'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTubeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Runtime Minutes"
                  value={minutes.numberformat}
                  onChange={handleMinutes}
                  name="runtimeMinutes"
                  id="runtimeMinutes"
                  InputProps={{
                    inputComponent: NumericFormatCustom,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={(value)=>{setDate(value)}} label="Select a release date" />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  max={10}
                  precision={0.1}
                />
                <Box sx={{ ml: 2 }}>{rating}</Box>
              </Grid>

              <Grid item xs={12}>
                <Typography component="legend">Upload poster image</Typography>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onChange={uploadHandler}
                >
                  Poster image
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Typography variant="caption" display="block">{posterFile ? posterFile.name : 'No file uploaded!'}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="legend">Upload backdrop image</Typography>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onChange={uploadHandler2}
                >
                  Backdrop image
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Typography variant="caption" display="block">{backdropFile ? backdropFile.name : 'No file uploaded!'}</Typography>
              </Grid>

              <br/>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name='watched' color="primary" />}
                  label="I have already watched"
                />
                <FormControlLabel
                  control={<Checkbox name='popular' color="primary" />}
                  label="This movie is popular"
                />
                <FormControlLabel
                  control={<Checkbox name='coming' color="primary" />}
                  label="This movie is coming soon"
                />
                <FormControlLabel
                  control={<Checkbox name='watch_list' color="primary" />}
                  label="This movie is in my watch list"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create a Movie
            </Button>
          </Box>
        </Box>

        <Copyright sx={{ mt: 5 }} />

      </Container>
    </ThemeProvider>
  );
}