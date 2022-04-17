import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    },
    body: {
        backgroundColor: "white",
        padding: "20px"
    },
    body2: {
        backgroundColor: "white",
        padding: "20px"
    },
    column: {
        display: "flex",
        justifyContent: "center"
    },
    column2: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    card: {
        width:"100vh",
        backgroundColor: "#b477dd",
        display:"flex",
        justifyContent: "space-evenly",
        marginTop: "20px",
        borderRadius: "10px",
    },
    buttonp: {
        marginTop: "5px",
        alignItems: "center"
    },
    button: {
        
        height: "30px"
    }
});



const AdminPosition = () => {
    const classes = useStyles();
    const [newPosition, setNewPosition] = useState("");
    const [newyear, setNewyear] = useState("");
    const [postion, setPostion] = useState([]);
    const [deleteit, setDeleteit] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [re, setRe] = useState(true);
    useEffect(()=>{
        const fun = async() => {
            const url = "http://localhost:5000/api/position/"
            await axios.get(url).then((res)=>{
                setPostion(res.data);
                console.log(res.data);
            })
        }
        fun();
    },[re]);
    const handle = (e) => {
        setDeleteit(e);
        setOpen(true);
    }
    const handleChange = (event) => {
        setNewyear(event.target.value);
    };
    const handleClick = async() =>{
        const artical = {
            "position": newPosition,
            "minyear": newyear
        }
        const url="http://localhost:5000/api/position/";
        await axios.post(url,artical).then((res)=>{
            console.log(res.data);
        });
        setOpen(false);
        setRe(!re);
    }

    const handleClose = () => {
        setOpen(false);
        setDeleteit(null);
    };
    const handleDelete = async() =>{
        const url="http://localhost:5000/api/position/"+deleteit+"/";
        await axios.delete(url).then((res)=>{
            console.log(res.data);
        });
        setOpen(false);
        setRe(!re);
    }
  return (
    <div>
        <div className={ classes.body }>
            <Typography variant="h4" gutterBottom component="div" className={ classes.root }>
                Position
            </Typography>
            <Typography variant="h5" gutterBottom component="div" className={ classes.root }>
                The Detail of all position
            </Typography>
            <div className={ classes.column }>
                <div>
                    {
                        postion.map((e,index) =>{
                            return <div className={classes.card}>
                                <Typography variant="h5" gutterBottom component="div">
                                    {e.position}
                                </Typography>
                                <Typography variant="h5" gutterBottom component="div">
                                   Min-Year {e.minyear}
                                </Typography>
                                <div className={ classes.buttonp}>
                                <Button variant="contained" color="error" className={ classes.button } onClick={ ()=> {
                                    handle(e.id);
                                }}>Delete</Button>
                                </div>
                                
                                </div>
                        })
                    }
                </div>
                
            </div>
            
        </div>
        <div className={ classes.body2 }>
            <div className={ classes.column2 }>
            <TextField id="outlined-basic" label="Position" variant="outlined" onChange={(e)=>{setNewPosition(e.target.value);}} />
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newyear}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={1}>First</MenuItem>
                <MenuItem value={2}>Second</MenuItem>
                <MenuItem value={3}>Third</MenuItem>
                <MenuItem value={4}>Fourth</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Button variant="contained" onClick={handleClick} >Add Position</Button>
            </div>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{"Do You Seriosly Wnated to Delete this Position"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Ones You Delete this postion all the Candidate Applicatrion will 
                Also be Deleted.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDelete}>Agree</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AdminPosition