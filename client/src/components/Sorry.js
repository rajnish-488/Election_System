import React from 'react'
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    }
  });

const Sorry = (props) => {
    const classes=useStyles();
  return (
    <div className={ classes.root }>
        <Typography variant="h2" gutterBottom component="div">
            Sorry You Are Not Allowed { props.data }
        </Typography>
        <br/>
        <br/>
        <Typography variant="h3" gutterBottom component="div">
            Please Contact Admin To Allow Access
        </Typography>
    </div>
  )
}

export default Sorry