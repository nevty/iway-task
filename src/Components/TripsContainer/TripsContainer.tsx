import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import TripsTable from "./TripsTable/TripsTable";
import TripsFilter from "./TripsFilter/TripsFilter";
import {AppStateType} from "../../redux/store";
import {getTripsRequest} from "../../redux/trips-reducer";
import {ErrorCodeEnum, TripType} from "../../types/types";
import {GetTripsResponseType, PageDataType} from "../../api/api";
import {CircularProgress, Container} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {isMobile} from "../../utils/media";
import {makeStyles} from "@material-ui/core/styles";

type MapDispatchPropsType = {
    getTrips: (page?: number) => Promise<GetTripsResponseType>
}

type MapStateToPropsType = {
    isTripsFetching: boolean
    trips: Array<TripType>
    pageData: PageDataType
}
type OwnPropsType = {
    redirect: (route: string) => void
}

const useStyles = makeStyles(theme => ({
    layout: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        minHeight: "100vh"
    },
    header : {
        marginTop: "20px"
    },
    progress: {
        flexGrow: 1
    }
}))

const TripsContainer: React.FC<MapStateToPropsType & MapDispatchPropsType & OwnPropsType> = ({getTrips, isTripsFetching, trips, pageData, redirect}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageChange = (e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page);

    async function makeRequest<ReturnType>(request: (args: any) => Promise<ReturnType>, ...args: any) {
        return request.apply(null, args);
    }
    //Выносим асихронный запрос за хук
    useEffect(() => {
        makeRequest<GetTripsResponseType>(getTrips, currentPage)
            .then(resp => {
                if (resp && resp.error && resp.error.status === ErrorCodeEnum.unAuthorizedRequest) redirect('/login')
            })
    }, [currentPage])

    const [filteredTrips, filterTrips] = useState<TripType[]>([]);
    //массив с отфильтрованными поездками
    const [filters, setFilters] = useState<Function[]>([]);
    //массив с фильтрами
    useEffect(() => {
        //пройтись по каждому фильтру из списка
        //и вернуть отфильтрованый массив
        filterTrips(filters.reduce((trips, filter: any) => {
            return filter ? trips.filter(filter) : trips
            //если текущий фильтр null вернуть тот же массив
        }, trips))
    }, [filters, trips]);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={`${classes.layout} ${classes.container}`}>
            {
                (!isTripsFetching && <>
                        <div className={classes.header}><TripsFilter setFilters={setFilters}/></div>
                        <TripsTable trips={filteredTrips}/>
                    </>
                ) || <div className={`${classes.layout} ${classes.progress}`}><CircularProgress/></div>
            }
            <Pagination
                count={pageData.page_count} onChange={pageChange}
                size={isMobile ? "small" : "large"}
                disabled={isTripsFetching}
                shape="rounded"
            />
        </Container>
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