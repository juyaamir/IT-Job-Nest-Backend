import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jobRouter from './routers/jobRouter.js';
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "*"}))

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/jobs/v1', jobRouter);
app.listen(8000, () => {
    console.log(`Server is running on port http://localhost:8000`)
})