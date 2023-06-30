import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const [isDark,setIsDark]=useState(false);

    const toggleTheme=()=>{
        setIsDark((prev)=>!prev)
    }
    return(
        <ThemeContext.Provider value={{isDark,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}
export const useThemeContext=()=>useContext(ThemeContext);