import axios from 'axios';
import logger from '../tools/logger';

export const fetchPage = async (url: string): Promise<string | undefined> => {
    try {
        const res = await axios.get(url);

        return res.data;
    } catch (error) {
        logger.error(error);
    }
};
