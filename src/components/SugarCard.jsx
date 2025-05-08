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

    return <div className="sugar-card" style={{border: '1px solid black'}}>
        <div className="sugar-image">
            <img src={sugar.imageURL} alt="imageURL"/>
        </div>
        <div className="sugar-info">
            <h3>{sugar.name}</h3>
            <button className="PremiaChangeBtn" onClick={onPremiaClick}>premia: {premia}</button>
            <p>total price: {sugar.totalPrice.toFixed(3)}</p>
        </div>
    </div>
}

export default SugarCard