import { FC, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { Header, List } from "../../components";
import { getProducts } from "../../service";
import { IProduct } from "../../models";
import { useInfiniteScroll } from "../../hooks";
import { ProductsListPageWrapper } from "./styles";

export const ProductsListPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreProducts = async () => {
    if (loading) return;

    const newProducts = await getProducts();
    setProducts((prev) => [...prev, ...newProducts]);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);

    if (currentPage >= 10) {
      setHasMore(false);
    }
  };

  useInfiniteScroll(loadMoreProducts, hasMore);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current) => {
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

      <List productList={products} />
      {!hasMore && (
        <Pagination
          onChange={onShowSizeChange}
          current={currentPage}
          size="default"
          pageSize={20}
          total={200}
          responsive
        />
      )}
    </ProductsListPageWrapper>
  );
};
