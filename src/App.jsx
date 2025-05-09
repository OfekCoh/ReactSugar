import './css/App.css'
import SugarCard from "./components/SugarCard"
import FeeCard from "./components/FeeCard"
import { useGlobalContext } from './contexts/globalContext';
import imagesList  from './images/imageList';

// a component is any function in JS that returns JSX code (something that looks like html- needs to have parent element)
function App() {  

  // create sugar types
  const sugars= [
    {id: 1, name:"1KG", premia:0, imageURL:imagesList[0]},
    {id: 2, name:"25KG", premia:0, imageURL:imagesList[1]},
    {id: 3, name:"BB", premia:0, imageURL:imagesList[2]},
    {id: 4, name:"Kosher", premia:0, imageURL:imagesList[3]},
    {id: 5, name:"BB-Kosher", premia:0, imageURL:imagesList[4]},
  ];

  // create fees
  const fees= [
    {id: 1, name:"Hytels", premia:0},
    {id: 2, name:"Delivery", premia:0},
    {id: 3, name:"Switch", premia:0},
    {id: 4, name:"Sugar Price", premia:0},
  ]; 
  
  // get USD/ILS
  const { getPremia, shekelValue, loading, error } = useGlobalContext(); 
  
  // get values to calculate total sugar prices
  const Hytels = getPremia("Hytels");
  const Delivery = getPremia("Delivery");
  const Switch = getPremia("Switch");
  const SugarPrice = getPremia("Sugar Price");

  // calculate total sugar prices
  const sugarsWithTotal = sugars.map((sugar) => {
    const premia = getPremia(sugar.name);
    const totalPrice = ((SugarPrice + premia + Hytels + Delivery + Switch)* shekelValue)/1000;
    return { ...sugar, totalPrice};
  });

  // good morning text to copy
  const goodMorningText = `
  בוקר טוב
  הבורסה היום: ${SugarPrice.toFixed(2)}
  שער הדולר: ${shekelValue.toFixed(2)}
  
  קילו: ${sugarsWithTotal[0].totalPrice.toFixed(2)}
  25 קילו: ${sugarsWithTotal[1].totalPrice.toFixed(2)}
  ביג בג: ${sugarsWithTotal[2].totalPrice.toFixed(2)}
  
  25 קילו בדצ כשלפ: ${sugarsWithTotal[3].totalPrice.toFixed(2)}
  ביג בג בדצ כשלפ: ${sugarsWithTotal[4].totalPrice.toFixed(2)}
  
  יום טוב!`
  
  // copt the text on button click
  const copyToClipboard = () => {
    navigator.clipboard.writeText(goodMorningText)
  };


  // HTML PART
  return (
    <div className='Home'>

      <div className='SugarTypes'>            
        {sugarsWithTotal.map((sugar) => (
          <SugarCard sugar={sugar} key={sugar.id} />
        ))}
      </div>
        
      <div className='Fees'>
        {fees.filter(fee => fee.name !== "Sugar Price").map((fee) => (
          <FeeCard fee={fee} key={fee.id} />
        ))}
      </div>

      <div className='sugarDollarPrice'>
        <FeeCard fee={fees.find(fee => fee.id === 4)} key={4} />
      </div>

      <div className='shekelValue'>
        {loading ? ( 
          <div className='loading'>Loading...</div>
        ) : (
          <div>USD/ILS: {shekelValue.toFixed(2)}</div> 
        )}
        {error && <div className='error-message'>{error}</div>}
      </div>

      <div className="copyContainer">
      <button class="copyButton" onClick={copyToClipboard}>Copy Text</button>
      </div>

    </div>
  )
}

export default App  

