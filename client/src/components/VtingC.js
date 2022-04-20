import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import VotingBox from './VotingBox';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    }
  });

const VtingC = (props) => {
    const classes=useStyles();
    return (
        <div className={ classes.root }>
            <Typography variant="h3" component="div" gutterBottom>
                Voting For GymKhana
            </Typography>
            {
                props.data.map((e,index)=>{
                    return <VotingBox data ={e} />
                })
            }
        </div>
    )
}

export default VtingC