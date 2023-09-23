const logoutBtn = document.getElementById("logout-btn");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const profileBtn = document.getElementById("profile-btn");
const addToCartbtn = document.getElementsByClassName("add-to-cart");
const errorMsg = document.getElementsByClassName('error-msg')
const addCart = document.getElementsByClassName('add-to-cart')
const stock = document.getElementsByClassName('stock')

for (let i = 0; i < addToCartbtn.length; i++) {
  addToCartbtn[i].addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log(addToCartbtn[i].value)
    const body = addToCartbtn[i].value
    const split = body.split(' ')
    const prod = split[0]
    const stock = split[1]
    const data = {
        prod,
        stock
    }
    const response = await fetch("/api/carts/addProductToCart", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if(responseData.error === 'No hay mas stock de este producto' || responseData.error === 'No hay mas stock'){
        errorMsg[i].innerText = 'No hay mas stock'
        addCart[i].outerHTML = ''
    } else if (responseData.error === 'No puede agregar un producto que te pertenece'){
        errorMsg[i].innerText = 'No puede agregar un producto que te pertenece'
        addCart[i].outerHTML = ''
    } else if(responseData.error === 'Sesion no iniciada'){
      window.location.replace('/login')
    }else if(responseData.status === 'success'){
      const string = stock[i].innerHTML
      console.log(stock[i])
      console.log(string)
      const array = string.split(' ')
      const qty = parseInt(array[1])
      
      stock[i].innerText = 'Stock: ' + qty - 1
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (evt) => {
    window.location.replace("/logout");
  });
  profileBtn.addEventListener("click", async (evt) => {
    window.location.replace("/profile");
  });
} else {
  loginBtn.addEventListener("click", async (evt) => {
    window.location.replace("/login");
  });
  registerBtn.addEventListener("click", async (evt) => {
    window.location.replace("/register");
  });
}
