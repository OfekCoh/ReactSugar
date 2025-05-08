import { createContext, useState, useContext, useEffect } from "react";

const FeeContext = createContext()

export const useFeeContext = () => useContext(FeeContext)

export const FeeProvider = ({children}) => {       // provide state to all components that are wrapped around it
    const []
    
    
    return <FeeContext.Provider>
        {children}
    </FeeContext.Provider>
}   


