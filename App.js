import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {

  const [resultText, setResultText] = useState('');
  const [calculationText, setCalculationText] = useState('');
  const operations = ['CL', 'DE', '+', '-', '*', '%', '/'];
  const fadeAnim = new Animated.Value(0);
  
  useEffect(()=> {
    Animated.timing(fadeAnim, {
      toValue:1,
      duration:1000,
      useNativeDriver:true
    }).start();
  },[]);

  calculationResult = () => {
    const text = resultText;
    setCalculationText(eval(text));
  }


  validate = () => {
    const text = resultText;
    switch (text.slice(-1)) {// If the last character is an operator, replace it with the new operator
      case '+':
      case '-':
      case '*':
      case '%':
      case '/':
        return false;
    }
    return true;
  }
  handleModulus = () => {
    try {
      const percentage = (eval(resultText) / 100).toString();
      setCalculationText(percentage);
    } catch {
      setCalculationText('error');
    }
  }

  _onPressButton = (text) => {
    if (text == '=') {
      return validate() && calculationResult();
    }
    setResultText(resultText + text);
  }

  operate = (operation) => {
    switch (operation) {
      case 'CL':
        handleClear();
        break;
      case 'DE':
        let text = resultText.split('');
        text.pop();
        setResultText(text.join(''));
        break;
      case '%':
        if (resultText == '') return;
        handleModulus();
        setResultText(resultText + operation);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText.split('').pop();
        if (operations.indexOf(lastChar) > 0) return;
        if (resultText == '') return;
        setResultText(resultText + operation);

    }
  }

  const handleClear = () => {
    setCalculationText('');
    setResultText('');
  }

  let rows = [];
  let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity key={nums[i][j]} style={styles.btn} onPress={() => this._onPressButton(nums[i][j])}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(<View key={i} style={styles.row}>{row}</View>);
  }

  let ops = [];
  for (let i = 0; i < 7; i++) {
    ops.push(
      <TouchableOpacity key={operations[i]} style={styles.btn} onPress={() => this.operate(operations[i])}>
        <Text style={[styles.btnText, styles.white]}> {operations[i]} </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Animated.Text style={[styles.resultText,{opacity:fadeAnim}]}>{resultText}</Animated.Text>
      </View>
      <View style={styles.calculation}>
        <Animated.Text style={[styles.calculationText,{opacity:fadeAnim}]}>{calculationText}<Icon name="calculator" size={42} style={{color:'pink', marginLeft:40}} /></Animated.Text>
        </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  resultText: {
    fontSize: 25,
    paddingRight: 10,
    color: 'black',

  },
  btnText: {
    fontSize: 40,
    color: 'black',
  },
  white: {
    color: 'black',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  result: {
    flex: 2,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginTop:10,
   
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 50,
    paddingRight: 10,
    color: 'black',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    padding: 1,
    //backgroundColor: '#1e2326',
    backgroundColor: 'pink',
    borderTopLeftRadius:20
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    // backgroundColor: '#454e54',
    backgroundColor: '#808080',
    borderTopRightRadius:20
  },
});