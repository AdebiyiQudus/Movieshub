export default function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("NGN");

  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(0)

  return (
    <div>
      <input 
        type="text" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
      />
      <select 
        value={fromCurrency} 
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="NGN">NGN</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
         <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
     
      </select>

      <select 
        value={toCurrency} 
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="NGN">NGN</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
        
      </select>
      <button onClick={handleConvert}>Convert</button> 
      <h2>Converted Amount: {amount * exchangeRate}</h2>
      
    </div>
  );
}
