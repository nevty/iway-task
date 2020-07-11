import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getTripsRequest} from "../../redux/trips-reducer";
import {ErrorCodeEnum, TripType} from "../../types/types";
import {GetTripsResponseType, PageDataType} from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import TripsTable from "./TripsTable/TripsTable";
import Pagination from '@material-ui/lab/Pagination';
import {isMobile} from "../../utils/media";

type MapDispatchPropsType = {
    getTrips: (page?:number) => Promise<GetTripsResponseType>
}

type MapStateToPropsType = {
    isTripsFetching: boolean
    trips: Array<TripType>
    pageData: PageDataType
}
type OwnPropsType = {
    redirect: (route:string)=>void
}

const TripsContainer: React.FC<MapStateToPropsType & MapDispatchPropsType & OwnPropsType> = ({getTrips, isTripsFetching, trips,pageData,redirect}) => {
    const [currentPage,setCurrentPage] = useState(1);
    const pageChange = (e:React.ChangeEvent<unknown>,page:number)=>{
        setCurrentPage(page)
    }
    async function makeRequest<ReturnType>(request:(args:any)=>Promise<ReturnType>,...args:any){
        return request.apply(null,args);
    }
    //Выносим асихронный запрос за хук

    useEffect(() => {
        makeRequest<GetTripsResponseType>(getTrips,currentPage)
            .then(resp=>{
                if (resp.error && resp.error.status === ErrorCodeEnum.unAuthorizedRequest) redirect('/login')
            })
    }, [currentPage])

    return (
        <div>
            {
                (!isTripsFetching && <TripsTable trips={trips}/>) || <CircularProgress/>
            }
            <Pagination
                count={pageData.page_count} onChange={pageChange}
                size={isMobile ? "small" : "large"}
                shape="rounded"
            />
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isTripsFetching: state.tripsState.isFetching,
    trips: state.tripsState.trips,
    pageData: state.tripsState.page_data
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    getTrips: (page) => {
        return dispatch(getTripsRequest(page))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);