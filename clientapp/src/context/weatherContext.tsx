import React from 'react';
import { WeatherType} from '../types/Weather';

export interface WeatherContext{
    weather : WeatherType[],
    weatherLoaded : boolean,
    error? : string

}


const weatherContext = React.createContext<WeatherContext>({
    weather : [],
    weatherLoaded : false,
    error : ""
});

export default weatherContext;