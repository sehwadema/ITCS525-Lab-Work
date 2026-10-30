import { useState } from 'react'
import Button from './Button'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false)
  const [expression, setExpression] = useState('0')

  function handleNumber(number) {
    if (waitingForSecondNumber) {
      setDisplay(number)

      if (operator === null) {
        setExpression(number)
      } else {
        setExpression(expression + ' ' + number)
      }
      setWaitingForSecondNumber(false)
    } else if (display === '0') {
      setDisplay(number)
      setExpression(number)
    } else {
      setDisplay(display + number)
      setExpression(expression + number)
    }
  }
  function handleOperator(op) {
    setFirstNumber(Number(display))
    setOperator(op)
    setExpression(display + ' ' + op)
    setWaitingForSecondNumber(true)
  }
  function handleEquals() {
    if (operator === null) {
      return
    }
    const secondNumber = Number(display)
    let result

    if (operator === '+') {
      result = firstNumber + secondNumber
    }
    else if (operator === '-') {
      result = firstNumber - secondNumber
    }
    else if (operator === '*') {
      result = firstNumber * secondNumber
    }
    else if (operator === '/') {
      result = firstNumber / secondNumber
    }

    setDisplay(String(result))
    setExpression(String(result))
    setOperator(null)
    setWaitingForSecondNumber(true)
  }
  return (
    <div>
      <h2>Calculator</h2>
      <p>{expression}</p>


      <div>
        <Button value="7" onClick={() => handleNumber('7')} />
        <Button value="8" onClick={() => handleNumber('8')} />
        <Button value="9" onClick={() => handleNumber('9')} />
        <Button value="+" onClick={() => handleOperator('+')} />
        <br />

        <Button value="4" onClick={() => handleNumber('4')} />
        <Button value="5" onClick={() => handleNumber('5')} />
        <Button value="6" onClick={() => handleNumber('6')} />
        <Button value="-" onClick={() => handleOperator('-')} />
        <br />

        <Button value="1" onClick={() => handleNumber('1')} />
        <Button value="2" onClick={() => handleNumber('2')} />
        <Button value="3" onClick={() => handleNumber('3')} />
        <Button value="*" onClick={() => handleOperator('*')} />
        <br />

        <Button value="0" onClick={() => handleNumber('0')} />
        <Button value="/" onClick={() => handleOperator('/')} />
        <Button value="=" onClick={handleEquals} />
      </div>
    </div>
  )
}

export default App