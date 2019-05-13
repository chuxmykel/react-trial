/* eslint-disable no-eval */
import React, { Component } from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';

class Calculator extends Component {
  state = {
    equation: '',
    result: 0
  }

  onButtonPress = event => {
    //Get the current state of the equation
    let equation = this.state.equation;
    //Store the value of the clicked button
    const pressedButton = event.target.innerHTML;
    //Call the clear function if the pressed button is the C button
    if (pressedButton === 'C') return this.clear();
    //Concatenate the pressed button's value to the equation
    else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') equation += pressedButton;

    else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) equation += ' ' + pressedButton + ' ';
    else if (pressedButton === '=') {
      try {
        const evalResult = eval(equation);
        const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
        this.setState({result});
      } catch (error) {
        alert('Invalid Mathematical Equation');
      }
    }
    else {
      equation = equation.trim();
      equation = equation.substr(0, equation.length - 1);
    }
                
    this.setState({equation});
  }
  clear() {
    this.setState({equation: '', result: 0});
  }
  
  render () {
    return (
      <main className="calculator">
        <Screen equation={this.state.equation} result={this.state.result}/>
        <Keypad onButtonPress={this.onButtonPress} />
      </main>
    );
  }
}

export default Calculator;