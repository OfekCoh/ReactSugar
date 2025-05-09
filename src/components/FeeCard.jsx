import '../css/FeeCard.css'
import { useGlobalContext } from "../contexts/globalContext";

// display fee name, price (can be changed)
function FeeCard({fee}) {

    const { getPremia, updatePremiaMap } = useGlobalContext();
    const premia = getPremia(fee.name);

    function onPremiaClick() { // change premia value
        const input = prompt("Enter new value:", premia).trim();
        if (input === null || input === "") return; // User pressed Cancel or empty input
        if (!isNaN(input)) updatePremiaMap(fee.name, parseFloat(input));
        else alert("Please enter a valid number.");
    }

    return <div className="fee-card">
        <div className="fee-info">
            <button className="PremiaChangeBtn" onClick={onPremiaClick}>{fee.name}: {premia}</button>
        </div>
    </div>
}

export default FeeCard