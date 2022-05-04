import React from 'react'
import WebcamR from "react-webcam";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "column",
        textAlign: "center"
    },
    root2:{
      width: "100%",
      textAlign: "center",
      marginTop: "20px"
    }
});

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user"
}

const Webcam = ( props ) => {
  const classes= useStyles();
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      props.setimage(imageSrc);
    },

    [webcamRef]
  );
  return (
    <div>
        <div className={ classes.root }>
          <WebcamR
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
          />
        </div>
        <div className={ classes.root2 }>
          <Button variant="contained" color="success" size="large" onClick={ (e)=>{e.preventDefault();capture(); } }>
            Capture Image
          </Button>
        </div>
       
    </div>
  )
}

export default Webcam

