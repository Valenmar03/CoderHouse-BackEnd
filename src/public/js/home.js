fetch("http://localhost:8080/api/products")
  .then((res) => res.json())
  .then((res) => {
    const ul = document.getElementById("products-list");

    let productsList = "";
    let products;
    products = res.payload;
    products.forEach((product) => {
      productsList += `<li class="prodLi">
                <h2>${product.title}</h2>
                <img src="${product.thumbnail}" alt="${product.title}">
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
            </li>`;
    });
    ul.innerHTML = productsList
  });