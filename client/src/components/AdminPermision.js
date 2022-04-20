import React, {useEffect,useState} from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
      textAlign: "center"
  },
  heading: {
      margin: "60px"
  },
  button1: {
      width: "200px",
      height: "50px",
      color: "white",
      backgroundColor: "green",
      borderRadius: "10px"
  },
  button2: {
    width: "200px",
    height: "50px",
    color: "white",
    backgroundColor: "red",
    borderRadius: "10px",
}
});


const AdminPermision = () => {
    const classes= useStyles();
    const [data, setData] = useState({
        Apply: "False",
        Voting: "False",
        Result: "False"
    });
    useEffect(()=>{
        const fun =async() =>{
            const url = "http://localhost:5000/api/auth/"
            await axios.get(url).then((res)=>{
                console.log(res.data);
                setData(res.data)
            })
        }
        fun();
    },[])
    const sendData = async(Apply,Voting,Result) =>{
        const url = "http://localhost:5000/api/auth/"
        const artical={
            "Apply": Apply,
             "Voting": Voting, 
             'Result': Result,
        }
        await axios.post(url,artical).then((res)=>{
            console.log(res.data);
            setData(res.data);
        })
    }
    const handleApply = () =>{
        sendData("True","False","False")
    }
    const handleVoting=()=>{
        sendData("False","True","False")
    }
    const handleResult=()=>{
        sendData("False","False","True")
    }
    return (
        <div className={ classes.root }>
            <div className={ classes.heading }>
                <Typography variant="h4" gutterBottom component="div" className={ classes.root }>
                    Starting of Event
                </Typography>
                <Typography variant="h5" gutterBottom component="div" className={ classes.root }>
                    You can Chnage the Ability to Do Event
                </Typography>
            </div>
            <div className={ classes.heading }>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                    <button onClick={(e)=>{handleApply()}} className={data.Apply ==="True"?classes.button1:classes.button2}>
                        { data.Apply ==="True"?"Can Apply":"Can't Apply"}
                    </button>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <button onClick= {(e)=>{handleVoting()}} className={data.Voting ==="True"?classes.button1:classes.button2}>
                        { data.Voting ==="True"?"Can Do Voting":"Can't Do Voting"}
                    </button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <button onClick= {(e)=>{handleResult()}} className={data.Result ==="True"?classes.button1:classes.button2}>
                        { data.Result ==="True"?"Can See Result":"Can't See Result"}
                    </button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AdminPermision