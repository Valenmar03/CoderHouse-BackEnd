const roleBtn = document.getElementsByClassName("role");
const email = document.getElementsByClassName("email");

const modal = document.querySelector(".modal");
const closeModal = document.getElementById("modal-close-role");
const modalTitle = document.getElementById("modal-title");
const modalP = document.getElementById("modal-paragraph");

closeModal.addEventListener("click", async (evt) => {
  modal.classList.remove("modal--show");
  window.location.reload()
});

for (let i = 0; i < roleBtn.length; i++) {
  roleBtn[i].addEventListener("click", async (evt) => {
    

    const user = {
      email: email[i].innerHTML,
    };

    const response = await fetch("/api/users/changeRole", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    modal.classList.add("modal--show");

    const responseData = await response.json();
    console.log(responseData);
    if(responseData.message === 'New role: premium'){
        modalTitle.innerText = `Rol de ${responseData.payload} actualizado`
        modalP.innerText = 'El nuevo rol del usuario es: premium'
    }else if(responseData.message === 'New role: user'){
        modalTitle.innerText = `Rol de ${responseData.payload} actualizado`
        modalP.innerText = 'El nuevo rol del usuario es: user'
    }
});
}
