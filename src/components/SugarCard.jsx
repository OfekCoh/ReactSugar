import '../css/SugarCard.css'

import { useGlobalContext } from "../contexts/globalContext";

// display sugar name, premia, image, total price. and allow change of premia
function SugarCard({sugar}) {
    
    const { getPremia, updatePremiaMap } = useGlobalContext();
    const premia = getPremia(sugar.name);

    function onPremiaClick() { // change premia value
        const input = prompt("Enter new value:", premia).trim();
        if (input === null || input === "") return; // User pressed Cancel or empty input
        if (!isNaN(input)) updatePremiaMap(sugar.name, parseFloat(input));
        else alert("Please enter a valid number.");
    }

    return <div className="sugar-card">
        <div className="sugar-image">
            <img src={sugar.imageURL} alt="imageURL"/>
        </div>
        <div className="sugar-info">
            <div className='info-left-side'>
                <div className="sugar-info-name">{sugar.name}</div>
                <button className="PremiaChangeBtn" onClick={onPremiaClick}>premia: {premia}</button>
            </div>
            <div className="sugar-info-price">{sugar.totalPrice.toFixed(3)}</div>
        </div>
    </div>
}

export default SugarCard