import userRoute from './userRoute.js';
export default function route(app) {
    app.use('/user', userRoute);
}
