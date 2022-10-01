console.log('in client.js');

$(document).ready(onReady);

//this variable is set to whichever button was clicked 
let operator = '';

//These are created from the GET response object properties and appended to DOM 
let answer = '';
let input1Append = 0;
let input2Append = 0;
let operatorAppend = '';
let allEquations = [];

function onReady() {
    console.log(`let's do some math! 🤓`)

//***TODO create loadPreviousCalculations function and call it onReady.***//

    $('#calculatorForm').on('submit', calculate)
    $('#clear').on('click', clear)
    

    //event handlers for each mathematical operator
    $('#add').on('click', addOperator)
    $('#subtract').on('click', subtractOperator)
    $('#multiply').on('click', multiplyOperator)
    $('#divide').on('click', divideOperator)

    loadPreviousEquations();

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
        answer = response.result;
        input1Append = response.input1;
        input2Append = response.input2;
        operatorAppend = response.operator;
       
        render();
    })
    .catch(err => {
        console.log('GET /index-html error', err);
    })

}

function render() {
   
    $('#results').empty();
    $('#results').append(`<h2>${answer}</h2>`)

    $('#calculations').append(`
        <li>${input1Append} ${operatorAppend} ${input2Append} = ${answer}</li>
    `)
}

function clear() {
    $('#firstInput').val('') 
    $('#secondInput').val('') 
    
}

function loadPreviousEquations() {
    //get array of all previous equaltions from server
    $.ajax({
        url:'/allEquations',
        method: 'GET'
    })
    .then(response =>{
        console.log('here are all equations', response);
        allEquations = response;
        console.log('all equations is', allEquations)

        //object {input1: , operator: , input2: , result: }
        for(equation of allEquations){
            $('#calculations').append(`
            <li>${equation.input1} ${equation.operator} ${equation.input2} = ${equation.result}</li>
        `)
        }
    })
    .catch(err => {
        console.log('GET /index-html error', err);
    })
}