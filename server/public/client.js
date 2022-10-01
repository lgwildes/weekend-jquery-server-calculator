console.log('in client.js');

$(document).ready(onReady);

let operator = '';

function onReady() {
    console.log(`let's do some math! 🤓`)

    $('#calculatorForm').on('submit', showResult)
    

}

function showResult(evt) {
    evt.preventDefault();
    $('#results').append(`result`)
}