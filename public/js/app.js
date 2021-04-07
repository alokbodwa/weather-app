// console.log('inside client side js');
console.log('This cannot be used in the node js background. this is something only used in client side javascript');

// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');

// msgOne.textContent = 'From javascript' //prints 'From javascript' in client side js

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    const location = search.value;
    msgOne.textContent = 'Loading......';

    console.log(location); 
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // return console.log(data.error);
                msgOne.textContent = data.error;
            }
            else{
                console.log(data);
                msgOne.textContent = 'The Temperature in ' + data.address+ ' is ' + data.Temperature+ 'degree C';
                msgTwo.textContent = 'It is ' + data.condition;
            }
        })
    })

})