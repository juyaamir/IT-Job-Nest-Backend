import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jobRouter from './routers/jobRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "*"}))

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/jobs/v1', jobRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:8000`)
})