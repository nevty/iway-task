import React from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import InputMask from "react-input-mask";

type OwnTextFieldPropsType = {
    value?: string
}

export const renderTextField: React.FC<TextFieldProps & OwnTextFieldPropsType> = ({label, onChange, value, ...custom}) => (
    <TextField
        label={label}
        fullWidth={true}
        onChange={onChange}
        value={value}
        {...custom}
    />
)

export const MaskedTextField: React.FC<TextFieldProps & OwnTextFieldPropsType> = ({placeholder, onChange, value, ...custom}) => (
    <InputMask mask="+7 (999) 999-99-99" maskChar={null} value={value} onChange={onChange}>
        {() => (
            <TextField
                {...custom}
                placeholder={placeholder}
                type="tel"
                fullWidth={true}
            />
        )}
    </InputMask>
)