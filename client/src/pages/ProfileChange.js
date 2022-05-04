import React from 'react'
import Webcam from '../components/Webcam'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px"
  },
  center: {
      width: "100%",
      display: "flex",
      justifyContent: "center"
     
  }
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileChange = ( props ) => {
  const classes= useStyles();
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };  
  useEffect(()=>{
    const user=localStorage.getItem("username");
    if( !user ){
      window.location.href = "/signin";
    }
    const fun = async() =>{
      const url="http://localhost:5000/api/signinVoter/"+user+ "/";
          await axios.get(url).then((res) => {
            setUserInfo(res.data);
            console.log(res.data);
          })
    }
    console.log(typeof(image))
    fun()
  },[])
  const handle =()=>{
      const fun = async() => {
        handleToggle();
        const urls="http://localhost:5000/api/images/"+ userInfo.id + "/";
        const article={
          userid: userInfo.id,
          img: image
        }
        await axios.put(urls,article).then((res) => {
          handleClose();
          if(res.data){
              window.location.href= "/profile";
          }
        })
      }
     fun(); 
  }
  
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className={ classes.center }>
              <Webcam setimage= { setImage } />
              </div>
              
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={ classes.center }>
                <img src={ image } alt= "Capture the Image" />
              </div>
              <div className={ classes.root }>
              <Button variant="contained" color="success" size="large" onClick={ ()=>{ handle(); } }>
                Change Profile Image
              </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
        <div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
    </div>
  )
}

export default ProfileChange

