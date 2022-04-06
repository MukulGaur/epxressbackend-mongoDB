import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/mernRegistration").then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`error ${e}`);
})