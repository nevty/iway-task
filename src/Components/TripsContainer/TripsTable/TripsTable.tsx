import React from "react";
import {TripType} from "../../../types/types";
import {
    TableRow,
    TableCell,
    Table,
    TableHead,
    TableBody,
    IconButton,
    Collapse
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

type OwnPropsType = {
    trips: Array<TripType>
}

const mapFlatValueToCell = [
    {title: 'Отправление', key: 'location_address' as keyof TripType},
    {title: 'Дата', key: 'date_departure' as keyof TripType},
    {title: 'Прибытие', key: 'destination_address' as keyof TripType},
    {title: 'Дата', key: 'date_arrival' as keyof TripType},
]
//Для упрощения отрисовки сопостовляем название и ключ-значение поездки

const isMobile = window.innerWidth > 767;

const TripsTable: React.FC<OwnPropsType> = ({trips}) => (
    <Table size={isMobile ? "small" : "medium"}
           padding={isMobile ? "default" : "none"}>
        <TableHead>
            <TableRow>
                {mapFlatValueToCell.map(({title}, index) => (
                    <TableCell key={title + index}>
                        {title}
                    </TableCell>
                ))}
                <TableCell />
            </TableRow>
        </TableHead>
        <TableBody>
            {
                trips.map(row => <Row key={row.order_id} row={row}/>)
            }
        </TableBody>
    </Table>
)

type RowPropsType = {
    row: TripType
}

const Row: React.FC<RowPropsType> = ({row}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow>
                {mapFlatValueToCell.map(({key}) => (
                    <TableCell key={key} component="th" scope="row">
                        {row[key]}
                    </TableCell>
                ))}
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases"
                               padding={isMobile ? "default" : "none"}
                        >
                            <TableHead>
                                <TableRow>
                                    {[
                                        'Номер брони',
                                        'Транспорт',
                                        'Цена'
                                    ].map(value => (
                                        <TableCell>
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.booker_number}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.car_data.car_class} / {row.car_data.models}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.price.price} {row.currency}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TripsTable