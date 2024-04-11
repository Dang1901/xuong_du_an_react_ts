import mongoose, { Schema } from 'mongoose';
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            }
        },
    ],



},
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Cart', cartSchema);