import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useCart from "../hook/useCart";
import { useLocalStorage } from "../hook/useStorage";
import { IProduct } from "../../interfaces/products";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Input } from "../ui/input";

const OrderPage = () => {
  const form = useForm();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  console.log(userId);
  const { data, calculateTotal } = useCart();
  console.log(data);
  const { mutate } = useMutation({
    mutationFn: async (order: {
        userId: string;
        items: [];
        totalPrice: number;
        customerInfo: object;
    }) => {
        const {data} = await axios.post("http://localhost:8080/api/order", order,);
        return data;

    },
    onSuccess: () => {
        alert("Đặt hàng thành công!");
    }   
  });

  const onSubmit = (formData: object) => {
    mutate({
        userId,
        items: data?.products,
        totalPrice: calculateTotal(),
        customerInfo: formData,
    });
    // console.log(formData);
    
  }

 

  return (
    <div className="container mx-auto">
        <h1>Order</h1>
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tên"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="Số điện thoại"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Hoàn thành đơn hàng</Button>
                    </form>
                </Form>
            </div>
            <div className="col-span-4">
                {data?.products?.map((item: IProduct) => (
                    <div key={item._id} className="border-b py-4">
                        <h4>{item.name}</h4>
                        <p>Giá: {item.price}</p>
                        <p>Số lượng:{item.quantity}</p>
                    </div>
                ))}
                <p className="mt-5">
                    <strong className="mr-2">Sản phẩm:</strong>
                    {data?.products ? data?.products.length : 0}
                </p>
                <p>
                    <strong className="mr-2">tổng tiền:</strong>{" "}
                    {calculateTotal()}
                </p>
            </div>
        </div>  
    </div>
);
};

export default OrderPage;
