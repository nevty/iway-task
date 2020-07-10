import React from "react";
import TripsContainer from "../Components/TripsContainer/TripsContainer";

const Home = ({history}) => {
    const redirect = (route)=>{
        history.push(route)
    }
    return (
        <div>
            <TripsContainer redirect={redirect}/>
        </div>
    )
}

export default Home;