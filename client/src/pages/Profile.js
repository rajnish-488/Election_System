import React from 'react'
import Webcam from '../components/Webcam'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  useEffect(()=>{
    const user=localStorage.getItem("username");
    if( !user ){
      window.location.href = "/signin";
    }
    const fun = async() =>{
      const url="http://localhost:5000/api/signinVoter/"+user+ "/";
          await axios.get(url).then((res) => {
            setUserInfo(res.data);
            console.log(res.data);
          })
    }
    console.log(typeof(image))
    fun()
  },[])
  const handle =()=>{
      const fun = async() => {
        const urls="http://localhost:5000/api/images/"+ userInfo.id + "/";
        const article={
          userid: userInfo.id,
          img: image
        }
        await axios.put(urls,article).then((res) => {
          console.log(res.data);
        })
      }
     fun(); 
  }
  return (
    <div>
        <Webcam setimage= { setImage } />
        <img src={ image } alt= "fumck" />
        <button onClick={handle}>senddata</button>
    </div>
  )
}

export default Profile

