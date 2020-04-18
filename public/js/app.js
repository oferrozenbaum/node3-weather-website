console.log('Client side javascript file is loaded!')
console.log ('app.js loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Here is the foreacast'
    messageTwo.textContent = ''

    fetch('./weather?address=' + location).then((response) => {
        response.json().then((data) => {
           if (data.error) {
                return messageTwo.textContent = data.error
           } 
           messageOne.textContent = 'Location is ' + data.location
           messageTwo.textContent = data.forecast
        })
   })
})