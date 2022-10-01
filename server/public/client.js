console.log('in client.js');

$(document).ready(onReady);

let operator = '';
let result = '';

function onReady() {
    console.log(`let's do some math! 🤓`)

//***TODO create loadPreviousCalculations function and call it onReady.***//

    $('#calculatorForm').on('submit', calculate,)
    

    //event handlers for each mathematical operator
    $('#add').on('click', addOperator)
    $('#subtract').on('click', subtractOperator)
    $('#multiply').on('click', multiplyOperator)
    $('#divide').on('click', divideOperator)

}


// these functions set 'operator' to whatever button was clicked
function addOperator() {
    operator = '+'
    console.log('testing operator, expect add', operator)
}

function subtractOperator() {
    operator = '-'
    console.log('testing operator, expect subtract', operator)
}

function multiplyOperator() {
    operator = '*'
    console.log('testing operator, expect  multiply', operator)
}

function divideOperator() {
    operator = '/'
    console.log('testing oprator, expect divide', operator)
}



// send post request to server
function calculate(evt){
    evt.preventDefault();
    //this is the object we send to server
    calculation = {
        firstInput: $('#firstInput').val(),
        secondInput: $('#secondInput').val(),
        operator: operator // value is set based on button clicked

    }
    console.log ('testing calculation object',calculation )

    $.ajax({
        url:'/calculate',
        method: 'POST',
        data: calculation
    })

    .then((response) => {
            console.log('POST /calculate response expect status', response);
    })
    .catch(err => {
            console.log('POST /calculate error', err);
    });

    getCalculation()
    // render() 
}

function getCalculation(){
    $.ajax({
        url:'/calculate',
        method: 'GET'
    })
    .then(response => {             //response is my object {input1: , operator: , input2: , result: }
        console.log('GET /calculate', response);
        result = response;
        console.log('result to append is', response)
        let calculatedObject = response

        console.log('testing response properties', calculatedObject.input1)
    })
    
}


