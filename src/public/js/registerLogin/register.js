const form = document.getElementById("registerForm");
const completeValues = document.getElementById("complete-values");

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
  }else if(responseData.status === 'error'){
    completeValues.innerText = 'Completa todos los campos!'
  }
});
