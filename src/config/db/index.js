import mongoose from 'mongoose';

const connnect = async () => {
    await mongoose
        .connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('connect successfully!');
        })
        .catch((err) => {
            console.log(`Connect failure error: ${err}`);
        });
};

export default connnect;
