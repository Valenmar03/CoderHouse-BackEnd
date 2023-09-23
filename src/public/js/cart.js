const openModal = document.getElementById("open-modal");
const modal = document.querySelector(".modal");
const closeModal = document.getElementById("modal-close");
const buyBtn = document.getElementById("buy-btn");
const modalTitle = document.getElementById("modal-title");
const modalP = document.getElementById("modal-paragraph");

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
  const response = await fetch(`/api/tickets/${cid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "success") {
    const response = await fetch(`/api/tickets/${cid}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseDataPurchase = await response.json();
    console.log(responseDataPurchase);
    if (responseDataPurchase.status == "success") {
      modalTitle.innerText = "Compra realizada exitosamente";
      modalP.innerText = "Volver a la pagina de inicio...";
      buyBtn.innerText = "Inicio";
      buyBtn.addEventListener("click", () => {
        window.location.replace("/");
      });
      closeModal.outerHTML = "";
    } else if (
      responseDataPurchase.status == "error" &&
      responseDataPurchase.error == "Algunos de tus productos estan sin stock"
      ) {
        modalTitle.innerText = "Error: " + responseDataPurchase.error;
      modalP.innerText = "Revise su carrito";
      buyBtn.outerHTML = "";
    }else if (
      responseDataPurchase.status == "error" &&
      responseDataPurchase.error == "El/los producto/s estan sin stock"
    ){
      modalTitle.innerText = "Error: " + responseDataPurchase.error;
      modalP.innerText = "Revise su carrito";
      buyBtn.outerHTML = "";
    }
  }
});

const lessQtyBtn = document.getElementsByClassName("less-btn");
const qty = document.getElementsByClassName("prod-qty");

for (let i = 0; i < lessQtyBtn.length; i++) {
  
  lessQtyBtn[i].addEventListener("click", async (evt)=> {
      const string = qty[i].innerHTML
      const stringArray = string.split(" ")
      const prodQty = stringArray[1];
      
      const newProdQty = prodQty - 1

      qty[i].innerText = 'Cantidad: ' + newProdQty

      if(newProdQty < 1){
        const pid = lessQtyBtn[i].value

        const cid = document.getElementById('cart-id').innerHTML

        console.log(cid);
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);

        window.location.reload()
      }
  })
  
}

const moreQtyBtn = document.getElementsByClassName("more-btn");

for (let i = 0; i < moreQtyBtn.length; i++) {
  
  moreQtyBtn[i].addEventListener("click", (evt)=> {
      const string = qty[i].innerHTML
      const stringArray = string.split(" ")
      const prodQty = parseInt(stringArray[1]);
      
      const newProdQty = prodQty + 1

      qty[i].innerText = 'Cantidad: ' + newProdQty
  })
  
}