import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Sigup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.post(
        `http://localhost:8080/api/auth/signup`,
        user
      );
      return data.user;
    },
    onSuccess: () => {
      alert("Đăng ký thành công");
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      navigate(`/signin`);
    },
  });

  const onSubmit = (user) => {
    mutate(user);
    console.log(user);
    
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-lg-6">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                User name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                {...register("name", { required: true, minLength: 3 })}
              />
              {errors?.name?.message && (
                <span className="text-danger">{errors?.name?.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                {...register("email", { required: true })}
              />
              {errors?.email?.message && (
                <span className="text-danger">{errors?.email?.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                {...register("password")}
              />
              {errors?.password?.message && (
                <span className="text-danger">{errors?.password?.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="confirm password"
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword?.message && (
                <span className="text-danger">
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </div>

            <div className="text-center">
              <button className="btn btn-primary mr-3">Đăng ký</button>
              <Link to={"/signin"} className="btn btn-primary">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sigup;
