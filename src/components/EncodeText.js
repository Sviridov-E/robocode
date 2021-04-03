import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

export const EncodeText = ({setEncodingData}) => {
    const [state, setState] = useState('');

    const changeDataToEncode = e => {
        const value = e.target.value;
        setState(value);
        setEncodingData(value);
    };

    return (
        <>
            <TextField label="Text to encode!" variant="outlined" fullWidth value={state} onChange={changeDataToEncode}/>
        </>
    );
}