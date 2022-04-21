import React, {useEffect,useState} from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    width: "90vh",
    height: "auto",
    border: "1px solid black",
    borderRadius: "10px",
    marginTop: "20px",
    padding: "10px"
  },
  center: {
    display: "flex",
    justifyContent: "center"
  }
});

const VotingBox = (props) => {
    const classes=useStyles();
    const [posArray, setPosArray] = useState([]);
    useEffect(()=>{
        const user=localStorage.getItem("username");
        const fun = async() =>{
          const url="http://localhost:5000/api/poscanduser/"+props.data.id+"/"
          await axios.get(url).then((res) => {
            setPosArray(res.data);
          });
        }
        fun()
      },[])
    const [cand, setcand] = React.useState('');

    const handleChange = (event) => {
        setcand(event.target.value);
    };
  return (
    <div className={ classes.center }>
      <div className={ classes.root }>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
           Position :{ props.data.position }
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Candidate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cand}
            label="Age"
            onChange={handleChange}
          >
            {
              posArray.map((e,index)=>{
                  return <MenuItem value={ e.candid }>{ e.username }</MenuItem>
              })
            }
          </Select>
        </FormControl> 
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" size="large">Submit Vote</Button>
        </Grid>
      </Grid>
      </div>
    </div>
    
  )
}

export default VotingBox