const roleBtn = document.getElementsByClassName("role");
const email = document.getElementsByClassName("email");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("modal-close-role");
const modalTitle = document.getElementById("modal-title");
const modalP = document.getElementById("modal-paragraph");


const openModalDelete = document.getElementsByClassName("delete");
const deleteBtn = document.getElementsByClassName("modal-btn-delete")
const modalDelete = document.querySelector(".modal-delete");
const closeModalDelete = document.getElementById("modal-close-delete");
const modalTitleDelete = document.getElementById("modal-title-delete");
const modalPDelete = document.getElementById("modal-paragraph-delete");

for (let i = 0; i < openModalDelete.length; i++) {
    openModalDelete[i].addEventListener("click", () => {
        modalDelete.classList.add("modal--show-delete");
        modalTitleDelete.innerText = `Desea eliminar a ${email[i].innerHTML}`
        modalPDelete.innerText = 'Se eliminará el usuario para siempre, con sus productos'
    })  
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", async () => {

    const string = modalTitleDelete.innerHTML
    const stringArray = string.split(" ")
    const email = stringArray[stringArray.length - 1]

    const user = {
      email,
    };

    const response = await fetch("/api/users/deleteUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    modalDelete.classList.remove("modal--show-delete");
    window.location.reload();
  });
}

closeModalDelete.addEventListener("click", async (evt) => {
    modalDelete.classList.remove("modal--show-delete");
    window.location.reload();
});

closeModal.addEventListener("click", async (evt) => {
  modal.classList.remove("modal--show");
  window.location.reload();
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
    if (responseData.message === "New role: premium") {
      modalTitle.innerText = `Rol de ${responseData.payload} actualizado`;
      modalP.innerText = "El nuevo rol del usuario es: premium";
    } else if (responseData.message === "New role: user") {
      modalTitle.innerText = `Rol de ${responseData.payload} actualizado`;
      modalP.innerText = "El nuevo rol del usuario es: user";
    }
  });
}
