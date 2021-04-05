import React from 'react';
import { EncodeLink } from './EncodeLink';
import { EncodePhone } from './EncodePhone';
import { EncodeText } from './EncodeText';
import { EncodeWifi } from './EncodeWifi';
import { EncodeVCard } from './EncodeVCard';

export const DataToEncodeForm = ({type = 0, setEncodingData}) => {
    const forms = [
        <EncodeText setEncodingData={setEncodingData}/>,
        <EncodePhone setEncodingData={setEncodingData}/>,
        <EncodeLink setEncodingData={setEncodingData}/>,
        <EncodeWifi setEncodingData={setEncodingData}/>,
        <EncodeVCard setEncodingData={setEncodingData}/>
    ];
    return forms[type];
}