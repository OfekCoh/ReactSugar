import '../css/SugarCard.css'
import { useGlobalContext } from "../contexts/globalContext";
import { useRef, useEffect, useState  } from 'react';

// display sugar name, premia, image, total price. and allow change of premia
function SugarCard({sugar}) {
    
    const { getPremia, updatePremiaMap } = useGlobalContext();
    const premia = getPremia(sugar.name);
    const currentPremia = getPremia(sugar.name);

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
            updatePremiaMap(sugar.name, parseFloat(trimmed));
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

    // html
    return <div className="sugar-card">
        <div className="sugar-image">
            <img src={sugar.imageURL} alt="imageURL"/>
        </div>

        <div className="sugar-info">
            <div className='info-left-side'>
                <div className="sugar-info-name">{sugar.name}</div>

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
                    <button className="PremiaChangeBtn" onClick={handlePremiaClick}>premia: {premia}</button>
                )}
            </div>
            <div className="sugar-info-price"> {sugar.totalPrice.toFixed(2)} </div>
        </div>

        {(sugar.name === "1KG" || sugar.name === "25KG") && (
        <div className="floating-text">
            with taxes: {(sugar.totalPrice * (sugar.name === "1KG" ? 12 : 25) * 1.18).toFixed(2)}
        </div>
        )}
    </div>
}

export default SugarCard