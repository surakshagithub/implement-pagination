import { useEffect, useState } from "react";

export const BackendDriven = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await response.json();
      if (data && data?.products) {
        setProducts(data?.products);
        setTotalPages(data?.total / 10);
      }
    } catch (error) {
      console.eror("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(totalPages) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products?.map((indvProduct) => {
            return (
              <span className="indv-product" key={indvProduct?.id}>
                <img src={indvProduct?.thumbnail} alt={indvProduct?.title} />
                <span>{indvProduct?.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products?.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page === 1 ? "pagination__disabled" : ""}
          >
            ⬅️
          </span>
          {[...Array(Math.ceil(totalPages))].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                key={index}
                onClick={() => selectPageHandler(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page === totalPages ? "pagination__disabled" : ""}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};
