import { faker } from '@faker-js/faker/locale/es'

export const generateMockProds = () => {
    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.string.alphanumeric(10),
        id: faker.database.mongodbObjectId(),
        stock: faker.number.int({min: 0 , max: 100}),
        category: faker.commerce.department()
    }
}