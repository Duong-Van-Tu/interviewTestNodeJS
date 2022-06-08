import express from 'express';
import connect from './config/db/index.js';
import route from './routes/index.js';

const app = express();
const PORT = 5000;
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);

app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
});
