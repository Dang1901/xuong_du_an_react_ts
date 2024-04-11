import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/products";
import { useLocalStorage } from "./hook/useStorage";

const ProductsList = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { mutate } = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const { data } = await axios.post(
        `http://localhost:8080/api/cart/add-to-cart`,
        {
          userId,
          productId,
          quantity,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  const { data } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/api/products`);
      return data.products;
    },
  });
  return (
    <div className="product-list">
      {data?.map((product: IProduct, index: number) => {
        return (
          <div key={index} className="product-item">
            <div className="product-image">
              <img
                src={product?.image}
                alt="#"
                className="product__thumbnail"
              />
              <span className="product-sale">{product?.discount}%</span>
            </div>
            <div className="product-info">
              <h3 className="product__name">
                <Link to={`/products/${product._id}`} className="product__link">
                  {product?.name}
                </Link>
              </h3>
              <a href="#" className="product__category">
                category
              </a>
              <div className="product-price">
                <span className="product-price__new">
                  {product?.price - product?.price * (product?.discount / 100)}
                </span>
                <span className="product-price__old">{product?.price}</span>
              </div>
            </div>
            <div className="product-actions">
              <Link
                to={`/products/${product._id}`}
                className="btn product-action__quickview"
              >
                Quick View
              </Link>
              <button
                className="btn product-action__addtocart"
                onClick={() => mutate({ productId: product._id, quantity: 1 })}
              >
                Add To Cart
              </button>
              <div className="product-actions-more">
                <span className="product-action__share">Share</span>
                <span className="product-action__compare">Compare</span>
                <span className="product-action__like">Like</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
