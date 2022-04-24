import React from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PosResult from './PosResult';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
    root: {
      width: "100%",
      textAlign: "center"
    },
    center: {
        // display: "flex",
        // justifyContent: "center"
        width: "100%"
    }
});

const Resulting = (props) => {
    const classes=useStyles();
    return (
        <Container maxWidth="lg">
            <div className={ classes.root }>
                <Typography variant="h3" component="div" gutterBottom>
                    Result of GymKhana Election
                </Typography>
                <br/>
                <br/>
                <div className={ classes.center}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {
                                props.data.map((e,index)=>{
                                    return <Grid item xs={12} md={6}>
                                        <PosResult id = { e.id } name={ e.position } />
                                    </Grid>;
                                })
                            }
                        </Grid>
                    </Box>
                </div>
            </div>
        </Container>
        
    )
}

export default Resulting