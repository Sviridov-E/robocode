import React from 'react';
import { EncodeLink } from './EncodeLink';
import { EncodePhone } from './EncodePhone';
import { EncodeText } from './EncodeText';

export const DataToEncodeForm = ({type = 0, setEncodingData}) => {
    const forms = [
        <EncodeText setEncodingData={setEncodingData}/>,
        <EncodePhone setEncodingData={setEncodingData}/>,
        <EncodeLink setEncodingData={setEncodingData}/>
    ];
    return forms[type];
}