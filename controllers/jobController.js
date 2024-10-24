
import axios from 'axios';

export const getJobs = async (req, res) => {
    try {
        const response = await axios.get(process.env.JOB_COUNT_API, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'jobboerse-jobsuche'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}