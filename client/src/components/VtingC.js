import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import VotingBox from './VotingBox';
import axios from "axios";

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
    const [posVoted, setPosVoted] = useState([]);
    const [re, setRe] = useState(true);
    useEffect(()=>{
        const user=localStorage.getItem("username");
        const fun = async() =>{
          const url="http://localhost:5000/api/posvoted/"+user+"/"
          await axios.get(url).then((res) => {
            setPosVoted(res.data);
            console.log(res.data);
          });
        }
        fun()
    },[re])
    return (
        <div className={ classes.root }>
            <Typography variant="h3" component="div" gutterBottom>
                Voting For GymKhana
            </Typography>
            <div className={ classes.center}>
                {
                    props.data.map((e,index)=>{
                        if(!posVoted.includes(e.id)){
                            return <VotingBox data ={e} userdata={props.userData} re = {re} setit = {setRe} />
                        }else{
                            return
                        }
                    })
                }

            </div>
            
        </div>
    )
}

export default VtingC