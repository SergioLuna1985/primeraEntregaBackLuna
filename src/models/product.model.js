import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    code: {type: String, required: true, max: 100, unique: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String}

});

export const ProductModel = mongoose.model(productCollection, productSchema); 