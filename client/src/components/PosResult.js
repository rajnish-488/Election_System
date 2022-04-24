import React, {useEffect, useState} from 'react'
import axios from "axios";
import { PieChart, Pie, Tooltip} from 'recharts';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
        
    }
});



const PosResult = (props) => {
    const [data, setData] = useState({});
    const classes=useStyles();
    useEffect(()=>{
        const fun = async() =>{
            const url= "http://localhost:5000/api/result/"+  props.id  + "/";
            await axios.get(url).then((res) => {
                setData(res.data);
                console.log(res.data);
            })
        }
        fun();
    },[]);
    const solve = ( ) => {
        if(data.length===0){
            return <Typography variant="h5" component="div" gutterBottom>
                The Data Is Not Avalable
            </Typography>;
        }else{
            return <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>;

        }
    }
  return (
    <div>
        <Typography variant="h4" component="div" gutterBottom>
         Position: { props.name }
      </Typography>
        <div className={ classes.center }>
            {
                solve()
            }

        </div>
        
    </div>
  )
}

export default PosResult