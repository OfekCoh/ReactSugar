// here we start writing code 
import './App.css'
import { useState, useEffect } from "react";
import SugarCard from "./components/SugarCard"
import FeeCard from "./components/FeeCard"
import { getShekelValue } from './services/api';

// a component is any function in JS that returns JSX code (something that looks like html- needs to have parent element)
function App() {  
  
  const fees= [
    {id: 1, name:"Hytels", premia:0},
    {id: 2, name:"Delivery", premia:0},
    {id: 3, name:"Switch", premia:0},
  ]; 
   
  const sugars= [
    {id: 1, name:"1KG", premia:0, imageURL:"www"},
    {id: 2, name:"25KG", premia:0, imageURL:"www"},
    // {id: 3, name:"BB", premia:0, imageURL:"www"},
    // {id: 4, name:"Kosher", premia:0, imageURL:"www"},
    // {id: 5, name:"BB-Kosher", premia:0, imageURL:"www"},
  ];
  
  // get shekel value api (only once when page loads)
  const [shekelValue, setShekelValue] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // load api only once
  useEffect(() => {
    const loadShekelValue = async () => {
      try {
        const price= await getShekelValue();
        setShekelValue(price);
      } catch (err) {
        console.log(err);
        setError("Failed to load shekel value...")
      }
      finally {
        setLoading(false);
      }
    }
    loadShekelValue();
  },[]) 
  
  //get premia of sugars
  const OneKiloPremia = parseFloat(localStorage.getItem("OneKiloPremia")) || 0;
  
  // get the fees
  const Hytels = parseFloat(localStorage.getItem("Hytels")) || 0;
  const Delivery = parseFloat(localStorage.getItem("Delivery")) || 0;
  const Switch = parseFloat(localStorage.getItem("Switch")) || 0;

  console.log("shekel value :", shekelValue);


  return (
    <div className='Home'>

      <div className='SugarTypes'>
        <h3>sugar types:</h3>
        {sugars.map((sugar) => (
          <SugarCard sugar={sugar} key={sugar.id} />
        ))}
      </div>
        
      <div className='Fees'>
        {fees.map((fee) => (
          <FeeCard fee={fee} key={fee.id} />
        ))}
      </div>

      {loading ? ( 
        <div className='loading'>Loading...</div>
      ) : (
        <h3>shekel value: {shekelValue}</h3> 
      )}

      {error && <div className='error-message'>{error}</div>}
      
    </div>
  )
}

export default App

// ((sugar+twebtyfivepremia+hytels+switchp+delivery)*double.parse(dollarrate)/1000)