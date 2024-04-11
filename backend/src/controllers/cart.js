import Cart from "../model/cart";
import product from "../model/product";
import Product from "../model/product";
import User from "../model/user";
import { StatusCodes } from "http-status-codes";

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    const cartData = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
    };
    console.log(cartData);
    return res.status(StatusCodes.OK).json(cartData);
  } catch (error) {}
};

export const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    //Kiểm tra giỏ hàng có tồn tại hay không? dực theo UserId
    let cart = await Cart.findOne({ userId });
    //nếu có giỏ hàng không tồn tại thì chúng ta tạo mới
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existProductIndex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    // kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
    if (existProductIndex !== -1) {
      // nếu sản phẩm tồn tạo trong giỏi hàng thì chúng ta cập nhật số lựog
      cart.products[existProductIndex].quantity += quantity;
    } else {
      // nếu sản phẩm chưa có trong giỏ hàng thì chúng ta thêm mới
      cart.products.push({ productId, quantity });
    }
    // lưu giỏ hàng
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    // trả về client lỗi
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "lỗi" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart no found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "innernal Sever Error" });
  }
};

export const updateproductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart no found" });
    }
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "product not found" });
    }
    product.quantity = quantity;
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {}
};

export const increaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity++;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
