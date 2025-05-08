import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const defaultMap = {
    Hytels: 0,
    Delivery: 0,
    Switch: 0,
    "1KG" : 0, 
    "25KG" : 0, 
    "BB" : 0, 
    "Kosher" : 0, 
    "BB-Kosher" : 0, 
  };

export const GlobalProvider = ({children}) => {  // provide state to all components that are wrapped around it
    
    // create the map state + load it at launch
    const [premiaMap, setMap] = useState(() => {
        const saved = localStorage.getItem("premiaMap"); // get the whole map
        return saved ? JSON.parse(saved) : defaultMap;
      });
    
    // save map to local storage anything changes in the map
    useEffect(() => {
      localStorage.setItem("premiaMap", JSON.stringify(premiaMap));
    }, [premiaMap]);

    // get specific premia by name 
    const getPremia = (name) => premiaMap[name] ?? 0;

    // update map for a premia change
    const updatePremiaMap = (name, value) => {
        setMap((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const value= { getPremia, updatePremiaMap }

    return <GlobalContext.Provider value={value}>
        {children}
    </GlobalContext.Provider>
}   


