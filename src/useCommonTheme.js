import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useMemo } from 'react';

export const useCommonTheme = () => {
    const theme = useMemo(() => {
        return createMuiTheme({
            palette: {
                primary: {
                    main: green[500]
                }
            }
        })
    }, [])

    return theme;
}