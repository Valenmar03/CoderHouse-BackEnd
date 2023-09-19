const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("complete-values");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const user = {
    first_name: first_name,
    last_name: last_name,
    password: password,
    email: email
  }

  const response = await fetch('/api/sessions/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })


  const responseData = await response.json();
  console.log(responseData);

  if (responseData.status === "success") {
    window.location.replace("/login");
  }else if(responseData.error === 'Missing credentials'){
    errorMsg.innerText = 'Completa todos los campos!'
  }else if(responseData.error === 'User already exists'){
    errorMsg.innerText = 'Ya existe un usuario con este correo'
  }else if(responseData.error === 'Invalid characters'){
    errorMsg.innerText = 'Caracteres invalidos'
  }else if(responseData.error === 'You cant put more than 2 first names'){
    errorMsg.innerText = 'No puede ingresar mas de dos nombres'
  }else if(responseData.error === 'You put more than one space'){
    errorMsg.innerText = 'Error ingresando nombre. Revisalo!'
  }
});
