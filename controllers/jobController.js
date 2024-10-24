// fetching jobs from the database of url https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs'
// and returning the response to the client

import axios from 'axios';

export const getJobs = async (req, res) => {
    try {
        const response = await axios.get(`https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs`, {
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