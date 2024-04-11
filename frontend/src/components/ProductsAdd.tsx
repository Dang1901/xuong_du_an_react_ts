import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { IProduct } from "../interfaces/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  price: Joi.number().positive().required(),
  image: Joi.string().uri(), // Thêm kiểm tra URI cho link ảnh
  description: Joi.string(),
  discount: Joi.number(),
});

const ProductsAdd = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
      discount: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (product: IProduct) => {
      const { data } = await axios.post(
        `http://localhost:8080/api/products`,
        product
      );
      return data.product;
    },
    onSuccess: () => {
      alert("Thêm sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
    },
  });

  const onSubmit = (product: IProduct) => {
    mutate(product);
    navigate(`/admin`);
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name product
          </label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            placeholder="Enter product name"
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className={`form-control ${errors.price && "is-invalid"}`}
            placeholder="Enter price"
            {...register("price")}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            {...register("image")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter discount"
            {...register("discount")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows={5}
            placeholder="Enter description"
            {...register("description")}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductsAdd;
