import { useState, useEffect } from "react";

// display fee name, price (can be changed)
function FeeCard({fee}) {
    
    const localStorageKey = fee.name;

    // Load premia from localStorage, or fallback to fee.premia
    const [premia, setPremia] = useState(() => {
        const saved = localStorage.getItem(localStorageKey);
        return saved !== null ? parseFloat(saved) : fee.premia;
    });

    // Save to localStorage whenever premia changes (syntax is run this function whenever that [] changes)
    useEffect(() => {
        localStorage.setItem(localStorageKey, premia);
    }, [premia]);

    function onPremiaClick() { // change premia value
        const newValue = prompt("Enter new value:", premia).trim();
        if (newValue === null || newValue === '') return; // User pressed Cancel or empty input

        if(!isNaN(newValue)) setPremia(parseFloat(newValue));
        else alert("Please enter a valid numeric value.")
    }

    return <div className="fee-card" style={{border: '1px solid black'}}>
        <div className="fee-info">
            <button className="PremiaChangeBtn" onClick={onPremiaClick}>{fee.name}: {premia}</button>
        </div>
    </div>
}

export default FeeCard