import React from 'react';
import { Newstype } from '../types/News';

export interface AppContext{
    news : Newstype[],
    filesReady : boolean,
    error? : string
}

const appContext = React.createContext<AppContext>({
    news : [],
    filesReady : false,
    error : ""
});

export default appContext;
