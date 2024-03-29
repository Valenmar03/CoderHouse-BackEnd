const socket = io();
const form = document.getElementById("addProductForm");
const logoutBtn = document.getElementById("logout-btn");
const button = document.getElementById("prod-button");
const errorMsg = document.getElementById('error-msg')

socket.on("products-list", (data) => {
  const ul = document.getElementById("product-list");

  let products = "";
  data.forEach((product) => {
    products += `<li>
            <h2>${product.title}</h2>
            <img src="${product.thumbnail}" alt="${product.title}">
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        </li>`;
  });
  ul.innerHTML = products;
});

logoutBtn.addEventListener("click", async (evt) => {
  window.location.replace("/logout");
});


form.addEventListener("submit",async (evt) => {
  evt.preventDefault();
  const title =  document.getElementById("title").value;
  const description =  document.getElementById("description").value;
  const price =  document.getElementById("price").value;
  const category =  document.getElementById("category").value;
  const stock =  document.getElementById("stock").value;
  const thumbnail =  []

  const pathImg = document.getElementById("thumbnail").value

  if (pathImg.length > 1) {
    thumbnail.push(pathImg);  
  }
  
  const product = {
    title,
    description,
    price,
    thumbnail,
    category,
    stock,
  };

  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  const responseData = await response.json()
  console.log(responseData)
  if(responseData.error === 'Error de creacion de producto'){
    errorMsg.innerText = 'Completa todos los campos!'
  } else if(responseData.status === 'success'){
    window.location.reload()
  } else if(responseData.error == 'Invalid data type for stock or price'){
    errorMsg.innerText = 'Datos invalidos'
  } else if(responseData.error == "Negative numbres aren't allowed"){
    errorMsg.innerText = 'El precio y stock deben ser mayores a 0'
  }
});