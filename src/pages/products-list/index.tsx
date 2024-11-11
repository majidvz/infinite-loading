import { FC } from "react";
import { Pagination } from "antd";
import { List, Header } from "../../components";
import { ProductsListPageWrapper } from "./styles";
import { getProducts } from "../../getProducts";

export const ProductsListPage: FC = () => {
  const products = getProducts();
  console.log(products);

  return (
    <ProductsListPageWrapper
      justify="flex-start"
      align="center"
      vertical
      gap={40}
    >
      <Header />
      <List />
      <Pagination />
    </ProductsListPageWrapper>
  );
};
