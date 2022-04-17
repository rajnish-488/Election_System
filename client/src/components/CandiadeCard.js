import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

  position: {
      backgroundColor: "#b477dd",
      width: "100vh",
      padding : "5px",
      paddingLeft: "10vh",
      paddingRight: "10vh",
      height: "auto",
      borderRadius: "10px",
      curser: "pointer"
  },
  pos: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      textAlign: "center",
      padding: "10px"
  },
  comp: {
    marginLeft: "20px"
  },
  text: {
    fontSize: "20px"
  }
  
});


const CandiadeCard = ( props ) => {
  const [user, setUser] = useState({});
  const [position, setPosition] = useState({});
  const classes = useStyles();
  useEffect(()=>{
    const fun= async() => {
      const url = "http://localhost:5000/api/voters/"+ props.props.voters + "/";
      await axios.get(url).then((res)=>{
          setUser(res.data)
      })
      const url2 = "http://localhost:5000/api/position/"+ props.props.position + "/";
      await axios.get(url2).then((res)=>{
          setPosition(res.data)
      })
    }
    fun()
  },[])
  const handleClick = () =>{
    console.log(props.props.id);
  }

  return (
    <div className= { classes.position} onClick= { handleClick }>
      <div className={ classes.pos }>
          <div>
              <div className={ classes.text }>
                Name: { user.name }
              </div>
              <div className={ classes.text }>
                Min year: { user.year }
              </div>
              <div className={ classes.text }>
                Stream: { user.stream }
              </div>
          </div>

          <div className={ classes.comp }>
            <div className={ classes.text }>
               Position Applyed
            </div>
            <div className={ classes.text }>
              {position.position}
            </div>
          </div>

      </div>
    </div>
  )
}

export default CandiadeCard
