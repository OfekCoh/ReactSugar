import '../css/FeeCard.css'
import { useGlobalContext } from "../contexts/globalContext";
import { useRef, useEffect, useState  } from 'react';

// display fee name, price (can be changed)
function FeeCard({fee}) {

    const { getPremia, updatePremiaMap } = useGlobalContext();
    const premia = getPremia(fee.name);
    const currentPremia = getPremia(fee.name);

    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(currentPremia);
    const inputRef = useRef(null);

    // Focus input when editing mode is enabled
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    function handlePremiaClick() {
        setInputValue(currentPremia);
        setIsEditing(true);
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function handleInputConfirm() {
        const trimmed = inputValue.toString().trim();
        if (trimmed === "") {
            setIsEditing(false);
            return;
        }
        if (!isNaN(trimmed)) {
            updatePremiaMap(fee.name, parseFloat(trimmed));
        } else {
            alert("Please enter a valid number.");
        }
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleInputConfirm();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    }

    return <div className="fee-card">
        <div className="fee-info">

            {isEditing ? (
                    <input
                        className="input"
                        ref={inputRef}
                        type="number"
                        inputMode="decimal"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onKeyDown={handleKeyDown}
                    />
                ) : (

            <button className="PremiaChangeBtn" onClick={handlePremiaClick}>
                {fee.name === "Sugar Price" ? `${fee.name}: $${premia}` : `${fee.name}: ${premia}`}</button>

                )}
        </div>
    </div>
}

export default FeeCard