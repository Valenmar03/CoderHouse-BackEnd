export const productErrorIncompleteValues = (product) => {
    return `Falta ingresar campos: 
    *title: se esperaba un string y se recibió ${product.title}
    *description: se esperada un string y se recibió ${product.description}
    *price: se esperada un string y se recibió ${product.price}
    *category: se esperada un string y se recibió ${product.category}
    *stock: se esperada un string y se recibió ${product.stock}
    `
}

export const productErrorProdNotFound = (product) => {
    return `El Id de producto ingresado no es correcto`
}

