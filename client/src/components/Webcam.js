import React from 'react'
import WebcamR from "react-webcam";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "column",
        textAlign: "center"
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
          <button 
          onClick={ (e)=>{e.preventDefault();capture(); } }>
          Capture</button>
        </div>
    </div>
  )
}

export default Webcam

