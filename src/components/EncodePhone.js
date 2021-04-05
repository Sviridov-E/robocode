import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

export const EncodePhone = ({setEncodingData}) => {
    const [state, setState] = useState('');

    const changeDataToEncode = e => {
        const value = e.target.value;
        setState(value);
        setEncodingData('tel:' + value);
    };

    return (
        <>
            <TextField multiline label="Phone number" placeholder="+12345678901" variant="outlined" fullWidth value={state} onChange={changeDataToEncode}/>
        </>
    );
}