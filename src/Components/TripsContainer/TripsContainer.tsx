import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getTripsRequest} from "../../redux/trips-reducer";
import {ErrorCodeEnum, TripType} from "../../types/types";
import {GetTripsResponseType} from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import TripsTable from "./TripsTable/TripsTable";

type MapDispatchPropsType = {
    getTrips: () => Promise<GetTripsResponseType>
}

type MapStateToPropsType = {
    isTripsFetching: boolean
    trips: Array<TripType>
}
type OwnPropsType = {
    redirect: (route:string)=>void
}

const TripsContainer: React.FC<MapStateToPropsType & MapDispatchPropsType & OwnPropsType> = ({getTrips, isTripsFetching, trips,redirect}) => {
    async function makeRequest<ReturnType>(request:()=>Promise<ReturnType>){
        return request();
    }
    //Выносим асихронный запрос за хук

    useEffect(() => {
        makeRequest<GetTripsResponseType>(getTrips)
            .then(resp=>{
                if (resp.error && resp.error.status === ErrorCodeEnum.unAuthorizedRequest) redirect('/login')
            })
    }, [])
    return (
        <div>
            {
                (isTripsFetching && <CircularProgress/>)
                || <TripsTable trips={trips}/>
            }
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isTripsFetching: state.tripsState.isFetching,
    trips: state.tripsState.trips
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    getTrips: () => {
        return dispatch(getTripsRequest())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);