import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/products";

const ProductsList = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/api/products`);
      return data.products;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return (
        window.confirm("Are you sure?") &&
        (await axios.delete(`http://localhost:8080/api/products/${id}`))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
    },
  });

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="mt-2">Manage Product</h2>
        <Link to="products/add" className="btn btn-primary">
          Add
        </Link>
      </div>
      <table className="table table-bordered table-striped mt-3">
        {" "}
        {/* Thêm lớp table-striped để mỗi dòng có màu nền xen kẽ */}
        <thead className="table-dark">
          {" "}
          {/* Thêm lớp thead-dark cho header */}
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Name Product</th>
            <th className="text-center">Image</th>
            <th className="text-center">Price</th>
            <th className="text-center">Description</th>
            <th className="text-center">Discount</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: IProduct, index: number) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td>{product.name}</td>
              <td className="text-center">
                <img
                  src={product.image}
                  alt=""
                  width={50}
                  className="img-thumbnail"
                />
              </td>
              <td className="text-center">{product.price}</td>
              <td>{product.description}</td>
              <td className="text-center">{product.discount}</td>
              <td className="text-center">
                <div className="button-wrapper">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => mutate(product._id!)}
                  >
                    Delete
                  </button>{" "}
                  {/* Thêm lớp btn-sm để nút nhỏ hơn */}
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/admin/products/${product._id}/edit`}
                  >
                    Update
                  </Link>{" "}
                  {/* Thêm lớp btn-sm để nút nhỏ hơn */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
