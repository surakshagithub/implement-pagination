import { useEffect, useState } from "react";

export const FrontEndDriven = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      if (data && data?.products) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products?.length / 10 &&
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
          {products?.slice(page * 10 - 10, page * 10)?.map((indvProduct) => {
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
          {[...Array(Math.ceil(products.length / 10))]?.map((_, index) => {
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
            className={
              page === products?.length / 10 ? "pagination__disabled" : ""
            }
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};
