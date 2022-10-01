const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

// global variable to hold result of calculation
let result = ''

//POST calculate end point
app.post('/calculate', (req, res) => {          //req.body = calculation object
                                                  //{firstInput: , secondInput: , operator: ,}
  console.log('client has requested a calculation 📓', req.body);

  // figure out what function to call based on operator value


  //call function to do calculation
  calculate();

  res.sendStatus(201)
})



function calculate(input1, input2,) {
  input1 * input2
  return result

}








app.listen(port, () => {
  console.log('listening on port', port);
});



