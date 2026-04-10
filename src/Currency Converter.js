export default function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  
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
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select 
        value={toCurrency} 
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
