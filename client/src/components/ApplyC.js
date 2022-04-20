import React, {useEffect, useState} from 'react'
import axios from "axios"
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center"
  }
});

const ApplyC = () => {
    const classes=useStyles();
    const [position, setPosition] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    useEffect(()=>{
        const user=localStorage.getItem("username");
        const fun = async() =>{
          const url="http://localhost:5000/api/position/"
          await axios.get(url).then((res) => {
            setPosition(res.data);
            console.log(res.data);
          })
          const url2 = "http://localhost:5000/api/signinVoter/"+ user + "/"
          await axios.get(url2).then((res) => {
            setUserInfo(res.data);
            console.log(res.data);
          })
        }
        fun()
      },[])
      const [issue, setIssue] = useState("");
      const [slogon, setSlogon] = useState("");
      const [skill, setSkill] = useState("");
      const [pos, setPos] = React.useState("");

      const handleChange = (event) => {
        setPos(event.target.value);
      };
      const handle = () => {
        const fun = async() =>{
          const url="http://localhost:5000/api/candidate/"
          const artical={
            "issue": issue,
            "skill": skill,
            "slogan" : slogon,
            "voters": userInfo.id,
            "position": pos
          }
          await axios.post(url,artical).then((res) => {
            console.log(res.data);
          })
        }
        fun()
      }
    return (
        <div className={ classes.root }>
          <Typography variant="h3" component="div" gutterBottom>
              Select The Position you Wanted To Apply
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{minWidth: "300px"}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pos}
                label="Age"
                onChange={handleChange}
              >
                {
                  position.map((e,index)=>{
                      if(userInfo.year>=e.minyear){
                        return <MenuItem value={e.id}>{e.position}</MenuItem>
                      }else{
                        return 
                      }
                  })
                }
              </Select>
            </FormControl>
          </Box>
          <br/>
          <br/>
          <Typography variant="h3" component="div" gutterBottom>
              What Issue Will You Solve
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Tell Your Issues You Will Solve By Taking This Position"
            style={{ width: 550 }}
            onChange={(e) => { setIssue(e.target.value)}}
          />
          <Typography variant="h3" component="div" gutterBottom>
              Give Slogon For Election
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Your Nice Slogon"
            style={{ width: 550 }}
            onChange={(e) => { setSlogon(e.target.value)}}
          />
          <Typography variant="h3" component="div" gutterBottom>
              Your Skill For the Position
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Your Skill Set"
            style={{ width: 550 }}
            onChange={(e) => { setSkill(e.target.value)}}
          />
          <br/>
          <br/>
          <Button variant="contained" size="large" onClick={(e) =>{ handle() }}>Apply To Position</Button>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
    )
}

export default ApplyC