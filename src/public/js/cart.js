const openModal = document.getElementById("open-modal");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById('modal-close')
const buyBtn = document.getElementById('buy-btn');

openModal.addEventListener("click", async (evt) => {
  evt.preventDefault();
  modal.classList.add("modal--show");
});

closeModal.addEventListener("click", async (evt) => {
  evt.preventDefault();
  modal.classList.remove("modal--show");
});

buyBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const cid = buyBtn.value;
  console.log(cid);
  /* const response = await fetch(`/api/tickets/${cid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "success") {
  } */
});
