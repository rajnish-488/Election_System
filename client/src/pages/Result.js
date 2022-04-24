import React, {useEffect, useState} from 'react'
import axios from "axios";
import Sorry from '../components/Sorry';
import Resulting from '../components/Resulting';

const Result = () => {
  const [apply, setApply] = useState({});
  const [position, setPosition] = useState([]);
  useEffect(()=>{
    const user=localStorage.getItem("username");
    if( !user ){
      window.location.href = "/signin";
    }
    const fun = async() =>{
      const url="http://localhost:5000/api/position/"
          await axios.get(url).then((res) => {
            setPosition(res.data);
          })
      const url3 = "http://localhost:5000/api/auth/"
      await axios.get(url3).then((res) => {
        setApply(res.data);
      })
    }
    fun()
  },[])
  return (
    <div>
      { apply.Result==="True"?<Resulting data= {position} />:<Sorry data={ "See Result As Voting in Progress"} />}
    </div>
  )
}

export default Result