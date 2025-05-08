// here we start writing code 
import './App.css'
import { useState, useEffect } from "react";
import SugarCard from "./components/SugarCard"
import FeeCard from "./components/FeeCard"
import { useGlobalContext } from './contexts/globalContext';

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
  
  const { shekelValue, loading, error } = useGlobalContext();

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