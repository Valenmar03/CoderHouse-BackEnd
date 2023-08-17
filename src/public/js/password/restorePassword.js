const form = document.getElementById("restorePassForm");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const pass1 = document.getElementById("new-pass1").value;
  const pass2 = document.getElementById("new-pass2").value;

  const passwords = {
    pass1,
    pass2,
  };

  const userToRestore = { passwords }
  const response = await fetch("/api/mailing/restorePass", {
    method: "POST",
    body: JSON.stringify(userToRestore),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.error === "Las contraseñas no coinciden") {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "Las contraseñas no coinciden";
  } else if (responseData.error === "Esta es tu contraseña actual") {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "Esta es tu contraseña actual";
  } else if (responseData.status == "success") {
    window.location.replace("/login");
  }
});
