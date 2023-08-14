const form = document.getElementById('mailingForm')

form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const email = document.getElementById('mail').value

    const response = await fetch('/mailing', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const responseData = await response.json()
    console.log(responseData)
})