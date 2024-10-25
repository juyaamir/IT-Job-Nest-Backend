import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jobRouter from './routes/jobRouter.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "*"}));
connectDB();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/jobs/v1', jobRouter);
app.use('/users/v1', userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:8000`)
})