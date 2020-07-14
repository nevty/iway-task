import React, {memo} from "react";
import {TripType} from "../../../types/types";
import {
    Table, TableBody, TableHead,
    TableRow, TableCell,
    Collapse,
    IconButton
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {isMobile} from "../../../utils/media";

const containerStyle = {marginTop: "30px", marginBottom: "30px"};

type OwnPropsType = {
    trips: Array<TripType>
}
const TripsTable: React.FC<OwnPropsType> = memo(({trips}) => (
    <Table size="medium"
           padding={isMobile ? "none" : "default"}
           style={containerStyle}
    >
        <TableHead>
            <TableRow>
                {['Пассажиры', 'Статус'].map(title => (
                    <TableCell key={title}>
                        {title}
                    </TableCell>
                ))}
                <TableCell/>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                trips.map(row => <Row key={row.order_id} row={row}/>)
            }
        </TableBody>
    </Table>
));


const cellStyle = {paddingBottom: 0, paddingTop: 0};

type RowPropsType = {
    row: TripType
}
const Row: React.FC<RowPropsType> = ({row}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {row.passengers.map((p, index) => `${p.name} ${p.phone}${index === row.passengers.length - 1 ? "" : ", "}`)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.status}
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={cellStyle} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases"
                               padding={isMobile ? "none" : "default"}
                        >
                            <TableHead>
                                <TableRow>
                                    {[
                                        'Номер брони',
                                        'Транспорт',
                                        'Цена'
                                    ].map(value => (
                                        <TableCell key={value}>
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
};

export default TripsTable