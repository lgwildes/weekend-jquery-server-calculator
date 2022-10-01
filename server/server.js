const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

// global variable to hold result of calculation
let result = [];
let resultToSend = {};

// //POST calculate end point
app.post('/calculate', (req, res) => {          //req.body = calculation object
                                                  //{firstInput: , secondInput: , operator: ,}
  console.log('client has requested a calculation 📓', req.body);

  // figure out what function to call based on operator value
  console.log('this is the operator',req.body.operator)

  let num1 = req.body.firstInput
  let num2 = req.body.secondInput
console.log('testing inputs',req.body.firstInput, req.body.secondInput)

  if(req.body.operator === '+') {
     //call function to do calculation
    calculateAdd(num1, num2);
    
  }

  if(req.body.operator === '-') {
    //call function to do calculation
   calculateSubtract(num1, num2);
 
  }

  if(req.body.operator === '*') {
    //call function to do calculation
   calculateMultiply(num1, num2);
 
  }

  if(req.body.operator === '/') {
    //call function to do calculation
   calculateDivide(num1, num2);
 
  }

 

  res.sendStatus(201)
})

app.get('/calculate', (req, res) => {
  console.log('Client wants result');
  
  sendThis = result[result.length-1]

  resultToSend = sendThis

  res.send(resultToSend);
})

app.get('/allEquations', (req, res) => {
  console.log('Client wants all previous equations');

  res.send(result);
})


// calculate functions for each operator TESTED AND WORK
function calculateAdd(input1, input2){
  solution = (Number(input1) + Number(input2))
  result.push({input1: input1, operator: '+', input2:input2, result: solution})
  console.log('result is', result)
  return result
}

function calculateSubtract(input1, input2){
  solution = input1 - input2
  result.push({input1: input1, operator: '-', input2:input2, result: solution})
  console.log('result is', result)
  return result
}

function calculateMultiply(input1, input2){
  solution = input1 * input2
  result.push({input1: input1, operator: '*', input2:input2, result: solution})
  console.log('result is', result)
  return result
}
function calculateDivide(input1, input2){
  solution = input1 / input2
  result.push({input1: input1, operator: '/', input2:input2, result: solution})
  console.log('result is', result)
  return result
}




app.listen(port, () => {
  console.log('listening on port', port);
});



