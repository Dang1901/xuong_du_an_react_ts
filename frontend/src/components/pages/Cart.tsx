import { ChangeEvent } from "react";
import useCart from "../../components/hook/useCart";

const CartPage = () => {
  const { data, mutate, handleQuantityChange, calculateTotal, isLoading, isError } = useCart();
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          mutate({
                            action: "DECREMENT",
                            productId: product.productId
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        style={{ maxWidth: '70px' }} // Set max width for input
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.productId,
                            e as ChangeEvent<HTMLInputElement>
                          )
                        }
                      />
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          mutate({
                            action: "INCREMENT",
                            productId: product.productId
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        mutate({
                          action: "REMOVE",
                          productId: product.productId
                        })
                      }
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-end">Tổng: ${calculateTotal()}</p>
      </div>
      <hr />
    </>
  );
};

export default CartPage;
