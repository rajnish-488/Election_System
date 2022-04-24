import React, {useEffect,useState} from 'react'
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    const [open, setOpen] = React.useState(false);
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const handleClick = () =>{
      //  console.log(props.data.id);
      //  console.log(props.userdata.id);
      //  console.log(cand);
      if(cand!==""){
        const fun = async() =>{
          const url="http://localhost:5000/api/vote/";
          const artical={
            "voters": props.userdata.id,
            "position": props.data.id,
            "candidate": cand
          }
          await axios.post(url , artical).then((res) => {
            console.log(res.data);
            props.setit(!props.re);
          });
        }
        fun()
      }else{
        setOpen(true);
      }
      
    }
    
      
  return (
    <div>
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
          <Button variant="contained" size="large" onClick={()=>{ handleClick() }}>Submit Vote</Button>
        </Grid>
      </Grid>
      </div>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Please Select an Candidate
        </Alert>
      </Snackbar>
    </Stack>
    </div>
    
  )
}

export default VotingBox