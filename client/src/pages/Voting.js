import React, {useEffect, useState} from 'react'
import axios from "axios";
import Sorry from '../components/Sorry';
import VtingC from '../components/VtingC';

const Voting = () => {
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
      { apply.Voting==="True"?<VtingC data={ position } />:<Sorry data={ "Give the Vote"} />}
    </div>
  )
}

export default Voting