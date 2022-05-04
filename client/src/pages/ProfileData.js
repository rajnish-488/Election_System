import { useState , useEffect } from "react"
import React from 'react';
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center",
      marginTop: "20px"
    },
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
       
    },
    img: {
        border: "4px solid blue",
        borderRadius: "50%"
    },
    margin: {
        marginTop: "20px"
    }
});

const handle = () =>{
    window.location.href = "/profilechange"
}

const ProfileData = () => {
    const classes= useStyles();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [regno, setRegno] = useState(0);
    const [stream, setStream] = useState("");
    const [year, setYear] = useState("");
    const [images, setImages] = useState("");
    const [id, setId] = useState(0);
    const [apply, setApply] = useState({});
    useEffect(()=>{
        const user=localStorage.getItem("username");
        if( !user ){
        window.location.href = "/signin";
        }
        const fun = async() =>{
            let useid= null;
            const url="http://localhost:5000/api/signinVoter/"+user+ "/";
            await axios.get(url).then((res) => {
                console.log(res.data);
                setEmail(res.data.email)
                setName(res.data.name);
                setUsername(res.data.username);
                setPassword(res.data.password);
                setRegno(res.data.regno);
                setStream(res.data.stream);
                setYear(res.data.year);
                useid=res.data.id
                setId(res.data.id);
            })
            const urls="http://localhost:5000/api/images/"+ useid + "/";
            await axios.get(urls).then((res) => {
                setImages(res.data.img)
            })
            const url3 = "http://localhost:5000/api/auth/"
            await axios.get(url3).then((res) => {
                setApply(res.data);
                console.log(res.data);
            })
        }
        
        fun()
    },[])
    const handleProfile = async () => {
        const artical={
            username,
            password,
            email,
            regno,
            name,
            stream,
            year
        }
        // console.log(artical);
        const url = "http://localhost:5000/api/voters/"+ id  + "/"
        await axios.put(url,artical).then((res)=>{
            console.log(res.data);
        })
        
    }
  return (
      <>
        <div className={ classes.center }>
            <div>
                <img src = { images} alt="Profile Image" className={ classes.img } />
                <div className={ classes.root }> 
                    <div>
                        {
                            apply.Voting==="False" && <Button variant="contained" onClick={() =>{ handle() }}>Change Profile Image</Button>
                        }  
                    </div>   
                </div>
            </div>
        </div>
        <div className={ classes.root }>
            <div className={ classes.margin }>
                <TextField 
                    id="outlined-basic"
                    label="Username" 
                    variant="outlined"
                    className={ classes.margin }
                    value= {username}
                    onChange={ (e)=>{ setUsername(e.target.value); }}
                />
            </div>
            <div className={ classes.margin }>
                <TextField 
                    id="outlined-basic"
                    label="Name" 
                    variant="outlined"
                    className={ classes.margin }
                    value= {name}
                    onChange={ (e)=>{ setName(e.target.value); }}
                />
            </div>
            <div className={ classes.margin }>
                <TextField 
                    id="outlined-basic"
                    label="Email" 
                    variant="outlined"
                    className={ classes.margin }
                    value= {email}
                    onChange={ (e)=>{ setEmail(e.target.value); }}
                />
            </div>
            <div className={ classes.margin }>
                <TextField 
                    id="outlined-basic"
                    label="Password" 
                    variant="outlined"
                    className={ classes.margin }
                    value= {password}
                    onChange={ (e)=>{ setPassword(e.target.value); }}
                />
            </div>
            <div className={ classes.margin }>
                <TextField 
                    id="outlined-basic"
                    label="Registration Number" 
                    variant="outlined"
                    className={ classes.margin }
                    value= {regno}
                    onChange={ (e)=>{ setRegno(e.target.value); }}
                />
            </div>
            <div className={ classes.margin }>
            <FormControl sx={{ minWidth: "200px"}}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="year"
                onChange={(e)=>{ setYear(e.target.value) }}
                >
                <MenuItem value={1}>First</MenuItem>
                <MenuItem value={2}>Second</MenuItem>
                <MenuItem value={3}>Third</MenuItem>
                <MenuItem value={4}>Forth</MenuItem>
                </Select>
            </FormControl>
            </div>

            <div className={ classes.margin }>
            <FormControl sx={{ minWidth: "200px"}}>
                <InputLabel id="demo-simple-select-label">Stream</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stream}
                label="year"
                onChange={(e)=>{ setStream(e.target.value) }}
                >
                <MenuItem value={"cse"}>Computer Science</MenuItem>
                <MenuItem value={"ese"}>Electical</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className={ classes.margin }>
                <Button variant="contained" onClick={() =>{ handleProfile() }} size="large">Change Profile </Button>  
            </div>
            <div className={ classes.margin }> 
            </div>
        </div>
      </>
    
  )
}

export default ProfileData