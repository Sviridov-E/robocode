import { AppBar, Box, Button, ButtonBase, Grid, makeStyles, Paper, Tab, Tabs, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import { grey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { useQrGenerator } from '../useQrGenerator';
import { DataToEncodeForm } from '../components/DataToEncodeForm';

const useStyles = makeStyles(theme => ({
    root: {
        color: grey[50]
    },
    button: {
        marginRight: '40px',
        color: grey[50]
    },
    content: {
        marginTop: '100px'
    },
    boxContent: {
        padding: theme.spacing(4)
    },
    paper: {
        width: '100%',
        height: '80vh',
    },
    typographyInTab: {
        marginLeft: '8px',
    },
    qrWrapper: {
        padding: theme.spacing(1)
    }
}))

export const MainPage = () => {

    const classes = useStyles();

    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [encodingData, setEncodingData] = useState('');

    const [typeOfData, setTypeOfData] = useState(0);
    const handleChangeTypeOfData = (e, val) => setTypeOfData(val);

    const {qr, createQr} = useQrGenerator();

    const submitHandler = e => {
        e.preventDefault()
        createQr(encodingData);
    }


    return (
        <>
            <AppBar className={classes.root}>
                <Toolbar>
                    <Typography style={{flexGrow: 1}} variant="h5">RoboCode</Typography>
                    {
                        !isMobile &&
                        <Box>
                            <Button className={classes.button}>Saved</Button>
                            <Button className={classes.button}>Settings</Button>
                            <Button className={classes.button}>Log Out</Button>
                        </Box>
                    }

                </Toolbar>
            </AppBar>
            <Grid className={classes.content} container justify="center">
                <Grid item container xs={12} md={9}>
                    <Paper elevation={3} className={classes.paper}>
                        <Tabs
                            value={typeOfData}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChangeTypeOfData}
                            centered
                        >
                            <Tab label={<ButtonBase disableRipple><TextFormatIcon/><Typography className={classes.typographyInTab} variant="button">Text</Typography></ButtonBase>}/>
                            <Tab label={<ButtonBase disableRipple><PhoneIcon/><Typography className={classes.typographyInTab} variant="button">Phone</Typography></ButtonBase>}/>
                            <Tab label={<ButtonBase disableRipple><LinkIcon/><Typography className={classes.typographyInTab} variant="button">Link</Typography></ButtonBase>}/>
                        </Tabs>
                        <Box className={classes.boxContent}>
                            <form noValidate autoComplete="off" onSubmit={submitHandler}>
                                <DataToEncodeForm type={typeOfData} setEncodingData={setEncodingData}/>
                                <Box m={4}>
                                    <Button variant="contained" color="primary" type="submit">create</Button>
                                </Box>
                            </form>
                        <Grid container justify="center">
                            <Paper className={classes.qrWrapper} elevation={3}>
                                {qr}
                            </Paper>
                        </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}