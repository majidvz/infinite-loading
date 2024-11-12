import { FC, useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { List, Header } from "../../components";
import { getProducts } from "../../getProducts";
import { IProduct } from "../../models";
import { useScrollEnd } from "../../useScrollEnd";
import { ProductsListPageWrapper } from "./styles";

export const ProductsListPage: FC = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allProducts = getProducts();

  const fetchData = (currentPage: number) => {
    const list = [];

    for (let i = 20 * (currentPage - 1); i < currentPage * 20; i++) {
      list.push(allProducts[i]);
    }

    setProductList([...productList, ...list]);
  };

  const isEndOfPage = useScrollEnd();

  useEffect(() => {
    setProductList(getProducts());

    if (isEndOfPage) {
      const newList = getProducts();
      setProductList((prev) => [...prev, ...newList]);
    }
  }, [isEndOfPage]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current) => {
    fetchData(current);
    setCurrentPage(current);
  };

  return (
    <ProductsListPageWrapper
      justify="flex-start"
      align="center"
      vertical
      gap={40}
    >
      <Header />

      <List productList={productList} />

      {productList.length === 200 ? (
        <Pagination
          onChange={onShowSizeChange}
          current={currentPage}
          size="default"
          pageSize={20}
          total={allProducts.length}
          responsive
        />
      ) : (
        <></>
      )}
    </ProductsListPageWrapper>
  );
};
