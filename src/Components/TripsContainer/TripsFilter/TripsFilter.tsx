import React, {memo, useCallback, useState, useEffect} from "react";
import { MaskedTextField } from "../../FormComponents/FormComponents";
import {debounce, Grid, Select, TextField, Typography} from "@material-ui/core";
import {TripType} from "../../../types/types";

type OwnProps = {
    setFilters: React.Dispatch<any>
}
type Fields = {
    name: string,
    phone: string,
    status: string
}
const TripsFilter: React.FC<OwnProps> = memo(({setFilters}) => {
    const [fields, setFields] = useState<Fields>({name: '', phone: '', status: ''});
    const handleChange = ({target}: any) => setFields({
        ...fields,
        [target.name]: target.value
    });
    // Модель состояния для инпутов

    const filterBy = ({name, phone, status}: Fields) => {
        name = name.trim().toLowerCase();
        phone = phone.slice(3).replace(/\D/g, '');
        //нужны только цифры
        let nameFilter = (trip: TripType) => trip.passengers.some(p => p.name.toLowerCase().includes(name));
        let phoneFilter = (trip: TripType) => trip.passengers.some(p => p.phone?.replace(/\D/g, '').includes(phone));
        let statusFilter = (trip: TripType) => trip.status === +status;
        setFilters([status ? statusFilter : null,phone ? phoneFilter : null ,name ? nameFilter : null ])
    };
    const debounced = useCallback(debounce(filterBy, 400), []);
    useEffect(() => {
        debounced(fields)
    }, [fields]);

    return (
        <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item xs={12} md={4}>
                <Typography variant="h6" color="textPrimary">
                    Фильтрация по пассажирам
                </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <TextField fullWidth name="name" value={fields.name} onChange={handleChange} placeholder="Имя"/>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <MaskedTextField fullWidth name="phone" value={fields.phone} onChange={handleChange} placeholder="Телефон"/>
            </Grid>
            <Grid item xs={8} sm={4} md={3}>
                <Typography variant="h6" align="right">
                    Статус поездки
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Select
                    native
                    value={fields.status}
                    inputProps={{
                        name: "status",
                        id: "status",
                    }}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </Select>
            </Grid>
        </Grid>
    )
})

export default TripsFilter;