import React from 'react';
import { SettingsType } from '../types/Settings';

export interface SettingsContext {
    settings : SettingsType,
    error? : string
}

const settingsContext = React.createContext<SettingsContext>({
    settings : {
                "location" : "Mikkeli",
                "weather" : true,
                "forecast" : true,
                "newsYle" : true,
                "newsIl" : true,
                "newsHs" : false,
                "limit" : 20
                },
    error : ""
})

export default settingsContext;