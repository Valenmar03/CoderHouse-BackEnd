const socket = io();

const button = document.getElementById('prod-button')

socket.on("products-list", data => {
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

const title = document.getElementById('title')

