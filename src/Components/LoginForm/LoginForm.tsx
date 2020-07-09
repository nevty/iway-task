import React, {useState} from 'react'
import {connect} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {makeStyles, Button, Typography, Grid} from "@material-ui/core";
import {ErrorCodeEnum, LoginDataType} from "../../types/types";
import {AppStateType} from '../../redux/store';
import {loginRequest} from '../../redux/user-reducer';
import {UserLoginResponseType} from '../../api/api';
import { renderTextField } from '../FormComponents/FormComponents';

const useStyles = makeStyles(theme => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    container: {
        minHeight: "100vh"
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const LoginForm: React.FC<MapDispatchPropsType> = ({login}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    let defaultValues = {
        login: "",
        password: ""
    };

    const {handleSubmit, control, reset, formState} = useForm<LoginDataType>({
        defaultValues,
        mode: "onChange"
    });
    const onSubmit = handleSubmit((data) => {
        login(data)
            .then(response => {
                if (response.error && (response.error.status === ErrorCodeEnum.wrongAuthStatus)) {
                    setMessage("Неверный пароль или логин")
                }
                return response
            })
            .catch(error => console.log(error));
        reset(defaultValues);
    })
    return (
        <Grid container className={classes.container} spacing={0} direction="column" alignItems="center"
              justify="center">
            <Grid item>
                <Typography variant="h5">
                    Login
                </Typography>
                {
                    message && <Typography color="secondary">{message}</Typography>
                }
                <form className={classes.form} onSubmit={onSubmit}>
                    <Controller as={renderTextField} control={control} label="Login"
                                rules={{required: true}}
                                name="login" margin="normal" variant="outlined"/>
                    <Controller as={renderTextField} control={control} label="Password"
                                rules={{required: true}} type="password"
                                name="password" margin="normal" variant="outlined"/>
                    <Button
                        type="submit" fullWidth
                        variant="contained" color="primary"
                        disabled={!formState.isValid}
                        className={classes.submit}
                    >
                        Log in
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

type MapDispatchPropsType = {
    login: (data: LoginDataType) => Promise<UserLoginResponseType>
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
    login: (data) => {
        return dispatch(loginRequest(data))
    }
})

export default connect((state: AppStateType) => ({}), mapDispatchToProps)(LoginForm)