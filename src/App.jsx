import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('USD')
  const [toCurrency, setToCurrency] = React.useState('EUR')
  const [fromPrice, setFromPrice] = React.useState(1)
  const [toPrice, setToPrice] = React.useState(0)

  const ratesRef = React.useRef({})

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates
        onChangeFromPrice(1)
      })
      .catch((err) => {
        console.warn(err);
        alert('ERROR TRY TO GET RATES')
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result.toFixed(2))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency]
    const result = price * ratesRef.current[fromCurrency]
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;