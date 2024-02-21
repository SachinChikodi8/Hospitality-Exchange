import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';
import { Close, StarBorder } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import axios from 'axios';
import BookRoom from './BookRoom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';
import { useValue } from '../../context/ContextProvider';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Room = () => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };

  const {
    state: { room },
    dispatch,
  } = useValue();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (room) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [room]);

  const handleClose = () => {
    dispatch({ type: 'UPDATE_ROOM', payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {room?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {room?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="room" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={room?.uName || ''}
            sx={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              zIndex: 2,
            }}
          >
            <Avatar src={room?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {' Night: '}
              </Typography>
              <Typography component="span">
                {room?.price === 0 ? 'Free Stay' : '$' + room?.price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Ratings: '}
              </Typography>
              <Rating
                name="room-ratings"
                defaultValue={3.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Place Name: '}
              </Typography>
              <Typography component="span">{place?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {'Address: '}
              </Typography>
              <Typography component="span">{place?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {'Details: '}
            </Typography>
            <Typography component="span">{room?.description}</Typography>
          </Stack>
          <Stack>
            <div>
              <Button variant="outlined" onClick={handleClick}>
                Book Room
              </Button>
              {showComponent && <BookRoom open={showComponent} onClose={() => setShowComponent(false)} />}
            </div>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Room;
