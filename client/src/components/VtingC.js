import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import VotingBox from './VotingBox';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    },
    center: {
        // display: "flex",
        // justifyContent: "center"
        width: "100%"
    }
});

const VtingC = (props) => {
    const classes=useStyles();
    return (
        <div className={ classes.root }>
            <Typography variant="h3" component="div" gutterBottom>
                Voting For GymKhana
            </Typography>
            <div className={ classes.center}>
                {
                    props.data.map((e,index)=>{
                        return <VotingBox data ={e} userdata={props.userData} />
                    })
                }

            </div>
            
        </div>
    )
}

export default VtingC