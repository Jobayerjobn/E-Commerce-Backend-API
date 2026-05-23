//db.js

import mongoose from "mongoose";


const connectDB = async () => {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Garer_Bazar');

        console.log('DB is connected');
    }catch(err){
        console.log(err.message);
        process.exit(1);

    };


};


export default connectDB;

