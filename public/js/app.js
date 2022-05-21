const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const userLocation = e.target.elements.location.value

    messageOne.textContent = ''
    messageTwo.textContent = ''

    messageOne.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?address=${userLocation}`).then((resposne) => {
    resposne.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        }
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
    })
})