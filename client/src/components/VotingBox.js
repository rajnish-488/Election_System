import React, {useEffect,useState} from 'react'
import Typography from '@mui/material/Typography';
import axios from "axios";

const VotingBox = (props) => {
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
  return (
    <div>
        <Typography variant="h3" component="div" gutterBottom>
            
        </Typography>
    </div>
  )
}

export default VotingBox