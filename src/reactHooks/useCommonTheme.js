import { createTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { useMemo } from 'react';

export const useCommonTheme = () => {
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                primary: {
                    main: green[500]
                },
                secondary: {
                    main: red[700]
                }
            }
        })
    }, [])

    return theme;
}