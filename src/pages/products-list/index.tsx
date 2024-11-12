import { FC, useEffect, useState } from "react";
import { Pagination, PaginationProps, Spin } from "antd";
import { Header, List } from "../../components";
import { getProducts } from "../../service";
import { IProduct } from "../../models";
import { useInfiniteScroll } from "../../hooks";
import { ProductsListPageWrapper } from "./styles";

export const ProductsListPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
  }>({ current: 1, pageSize: 20 });
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMoreProducts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const newProducts = await getProducts();
      setProducts((prev) => [...prev, ...newProducts]);
      setAllProducts((prev) => [...prev, ...newProducts]);
      setPagination((prev) => {
        if (prev.current + 1 > 10) {
          setHasMore(false);
        }
        return { ...prev, current: prev.current + 1 };
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useInfiniteScroll(loadMoreProducts, hasMore);

  useEffect(() => {
    if (!products.length) {
      loadMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange: PaginationProps["onChange"] = (current, size) => {
    setPagination({ current, pageSize: size });
    const newData = allProducts.slice((current - 1) * size, current * size);
    setProducts(newData);
    window.scrollTo(0, 0);
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
      {loading && <Spin spinning />}

      {!hasMore && (
        <Pagination
          onChange={onChange}
          current={pagination.current}
          size="default"
          pageSize={pagination.pageSize}
          total={200}
          responsive
        />
      )}
    </ProductsListPageWrapper>
  );
};
