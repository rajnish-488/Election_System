import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    },
    body: {
        backgroundColor: "white",
        padding: "20px"
    },
    position: {
        backgroundColor: "#b477dd",
        width: "100%",
        padding : "5px",
        paddingLeft: "10vh",
        paddingRight: "10vh",
        height: "auto",
        textAlign: "center",
        borderRadius: "10px"
    },
    pos: {
        display: "flex",
        justifyContent: "center"
    },
    pos2: {
        width: "auto",
        height: "auto",
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "hidden"
    },
    button: {
        marginTop: "40px"
    }
});



const Position = ( props ) => {
    const classes = useStyles();
    const handleClick =() => {
        window.location.href = "/apply"
    }
  return (
    <div className={ classes.body }>
        <Typography variant="h3" gutterBottom component="div" className={ classes.root }>
            Position Avalable for Vote
        </Typography>
        <Typography variant="h5" gutterBottom component="div" className={ classes.root }>
            Apply fast to be the Member of Gymkhana
        </Typography>
        <div className={ classes.pos }>
            <div className={ classes.pos2 }>
            {
                props.position.map( (e,index) => {
                    return <Typography variant="h6" gutterBottom component="div" className={ classes.position } key= { index }>Position: { e.position }  
                    { " and the Min Year Required Is" } { e.minyear }</Typography>
                })
            }
            </div>
        </div>
        <div className={ classes.pos }>
        <Button variant="contained" className={ classes.button } size="large" onClick={ handleClick } >Apply Now</Button>
        </div>
        
    </div>
  )
}

export default Position