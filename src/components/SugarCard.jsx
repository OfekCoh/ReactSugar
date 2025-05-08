import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/globalContext";


// display sugar name, premia, image, total price. and allow change of premia
function SugarCard({sugar}) {
    
    const localStorageKey = `premia-${sugar.name}`;

    // Load premia from localStorage, or fallback to sugar.premia
    const [premia, setPremia] = useState(() => {
        const saved = localStorage.getItem(localStorageKey);
        return saved !== null ? parseFloat(saved) : sugar.premia;
    });

    // Save to localStorage whenever premia changes
    useEffect(() => {
        localStorage.setItem(localStorageKey, premia);
    }, [premia]);

    function onPremiaClick() { // change premia value
        const newValue = prompt("Enter new premia value:", premia).trim();
        if (newValue === null || newValue === '') return; // User pressed Cancel or empty input

        if(!isNaN(newValue)) setPremia(parseFloat(newValue));
        else alert("Please enter a valid numeric value.")
    }

    const totalPrice = premia * 10; // example total price calculation

    return <div className="sugar-card" style={{border: '1px solid black'}}>
        {/* <div className="sugar-image">
            <img src={sugar.imageURL} alt="imageURL"/>
        </div> */}
        <div className="sugar-info">
            <h3>{sugar.name}</h3>
            <button className="PremiaChangeBtn" onClick={onPremiaClick}>premia: {premia}</button>
            <p>total price: {totalPrice}</p>
        </div>
    </div>
}

export default SugarCard