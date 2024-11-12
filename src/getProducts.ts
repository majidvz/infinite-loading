import { faker } from "@faker-js/faker";
import { IProduct } from "./models";
export const getProducts = () => {
  const products: IProduct[] = [];

  for (let i = 0; i < 20; i++) {
    products.push({
      id: Math.floor(Math.random() * 10000),
      title: faker.commerce.productName(),
      imageURL: faker.image.urlPicsumPhotos(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    });
  }

  return products;
};
