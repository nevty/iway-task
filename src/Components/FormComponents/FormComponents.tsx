import React from "react";
import {TextField, TextFieldProps} from "@material-ui/core";

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