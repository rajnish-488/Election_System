import React, {useEffect, useState} from 'react'
import axios from "axios";
import Sorry from '../components/Sorry';
import ApplyC from '../components/ApplyC';

const Apply = () => {
  const [apply, setApply] = useState({});
  useEffect(()=>{
    const user=localStorage.getItem("username");
    if( !user ){
      window.location.href = "/signin";
    }
    const fun = async() =>{
      const url3 = "http://localhost:5000/api/auth/"
      await axios.get(url3).then((res) => {
        setApply(res.data);
        console.log(res.data);
      })
    }
    fun()
  },[])
  return (
    <div>
      { apply.Apply==="True"?<ApplyC />:<Sorry data={ "Fill The Applcation "} />}
    </div>
  )
}

export default Apply