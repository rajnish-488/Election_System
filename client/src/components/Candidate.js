import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import CandidateCard from "./CandiadeCard"

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
        height: "50px",
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
    card: {
        marginTop: "20px"
    }
});


const Candidate = ( props ) => {
  const classes = useStyles();
  return (
    <div className={ classes.body }>
        <Typography variant="h3" gutterBottom component="div" className={ classes.root }>
            Candiate Who had Applied
        </Typography>
        <Typography variant="h5" gutterBottom component="div" className={ classes.root }>
            Some of your Friend Who Applyed Recently
        </Typography>
        <div className={ classes.pos }>
          <div>
              {
                  props.candidate.map((e,index) => {
                      return <div className={ classes.card }><CandidateCard props={e} key= {index}/></div>
                  })

              }
    
          </div>
        </div>        
    </div>
  )
}

export default Candidate