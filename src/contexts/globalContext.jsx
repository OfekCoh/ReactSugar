import { createContext, useState, useContext, useEffect } from "react";
import { getShekelValue } from '../services/api';

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const defaultMap = {
    Hytels: 0,  // fees
    Delivery: 0,
    Switch: 0,
    "1KG" : 0,  // sugars
    "25KG" : 0, 
    "BB" : 0, 
    "Kosher" : 0, 
    "BB-Kosher" : 0, 
    "Sugar Price" : 0, // market price
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

    // get shekel value api (only once when page loads)
    const [shekelValue, setShekelValue] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadShekelValue = async () => {
        try {
            const price= await getShekelValue(); // get api value

            if (typeof price === "number" && !isNaN(price) && price > 0) { // if legit save it to local storage
                setShekelValue(price);
                localStorage.setItem("shekelValue", price);
            } else {
                const saved = localStorage.getItem("shekelValue"); // if null use last local storage
                if (saved !== null) {
                    setShekelValue(parseFloat(saved));
                }
            }
        } catch (err) {
            console.log(err);
            const saved = localStorage.getItem("shekelValue");  // fallback if fetch fails
            if (saved !== null) {
                setShekelValue(parseFloat(saved));
            }
            setError("Failed to load shekel value...")
        }
        finally {
            setLoading(false);
        }
        }
        loadShekelValue();
    },[]) 

    // pass relevant values to whoever needs it
    const value= { getPremia, updatePremiaMap, shekelValue, loading, error } 

    return <GlobalContext.Provider value={value}>
        {children}
    </GlobalContext.Provider>
}   


