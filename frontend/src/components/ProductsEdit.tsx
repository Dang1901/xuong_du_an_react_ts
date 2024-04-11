import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data } = useQuery({
    queryKey: ["PRODUCTS", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      reset(data.product);
      return data.product;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axios.put(
        `http://localhost:8080/api/products/${product._id}`,
        product
      );
      return data.product;
    },
    onSuccess: () => {
      alert("Sửa sản phẩm thành công");
      queryClient.invalidateQueries("PRODUCTS");
      navigate("/admin");
    },
  });

  const onSubmit = (product) => {
    mutate(product);
  };

  return (
    <div className="container">
      <h2 className="mt-4">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label htmlFor="name" className="form-label">
            Name Product
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Name product"
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors?.name && (
            <span className="text-danger">
              Invalid name (minimum 3 characters required)
            </span>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            {...register("price", { required: true })}
          />
          {errors?.price && <span className="text-danger">Invalid price</span>}
        </div>

        <div className="mt-4">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Image"
            {...register("image")}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Discount"
            {...register("discount")}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows={5}
            placeholder="Description"
            {...register("description")}
          />
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductsEdit;
