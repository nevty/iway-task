import React from "react";
import TripsContainer from "../Components/TripsContainer/TripsContainer";
import Box from "@material-ui/core/Box";

const Home = ({history}) => {
    const redirect = (route)=>{
        history.push(route)
    }
    return (
        <Box component="section">
            <TripsContainer redirect={redirect}/>
        </Box>
    )
}

export default Home;