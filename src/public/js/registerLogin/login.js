const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);


  if (
    responseData.status === "success" &&
    responseData.message === "Admin is login"
  ) {
    window.location.replace("/profile");
  } else if (responseData.status === "success") {
    window.location.replace("/");
  }else if (responseData.status === "error") {
    const errorMsg = document.getElementById('error-msg')
    errorMsg.innerText = 'Correo o contraseña incorrectos'
  }
});
