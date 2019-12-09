import React from 'react';
import { WeatherType, ForecastType} from '../types/Weather';

export interface WeatherContext{
    weather : WeatherType[],
    forecast : ForecastType[],
    weatherLoaded : boolean,
    forecastLoaded : boolean,
    error? : string

}


const weatherContext = React.createContext<WeatherContext>({
    weather : [],
    forecast : [],
    weatherLoaded : false,
    forecastLoaded : false,
    error : ""
});

export default weatherContext;