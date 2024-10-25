import { getJobs } from "../controllers/jobController.js";
import express from 'express';

const jobRouter = express.Router();

jobRouter.get('/count', getJobs);

export default jobRouter;