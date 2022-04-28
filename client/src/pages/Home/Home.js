import React, { useEffect, useState } from 'react'
import HomeCard from '../../components/HomeCard'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Position from '../../components/Position';
import Candidate from '../../components/Candidate';

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center"
  }
});

const Home = () => {
  const classes = useStyles();
  const [position, setPosition] = useState([]);
  const [candidate, setCandidate] = useState([]);
  useEffect(() => {
    const user=localStorage.getItem("username");
    const fun = async() =>{
      const url="http://localhost:5000/api/position/"
      await axios.get(url).then((res) => {
        setPosition(res.data);
      })
      const url2="http://localhost:5000/api/candlimit/"
      await axios.get(url2).then((res) => {
        setCandidate(res.data);
      })
    }
    
    fun()
  },[]);
  
  return (
    <div>
      <Typography variant="h2" gutterBottom component="div" className={ classes.root }>
        Happy Voting to All
      </Typography>
      <HomeCard/>
      <Position
        position= { position }
      />
      <Candidate 
        candidate = { candidate }
      />
    </div>
  )
}

export default Home