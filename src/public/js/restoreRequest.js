const form = document.getElementById('mailingForm')

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const email = document.getElementById('mail').value
  console.log(email)

  const jsonEmail = {
    email
  }

  const response = await fetch('/api/mailing/restoreRequest', {
      method: 'POST',
      body: JSON.stringify(jsonEmail),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()
    console.log(responseData)
    if(responseData.error === 'No hay un usuario asociado a este correo'){
      const errorMsg = document.getElementById('error-msg')
      errorMsg.innerText = 'No hay un usuario asociado a este correo'
    }else if(responseData.status === 'success') {
      window.location.replace('/mailSended')
    } 
})