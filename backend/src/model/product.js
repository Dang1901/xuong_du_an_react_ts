import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
    },
    price: {
        type: Number,
        require: true

    },
    description: {
        type: String

    },
    image: {
        type: String

    },
    discount: {
        type: Number
    }
},
    { timestamps: true, versionKey: false }
);
export default mongoose.model('Product', productSchema)