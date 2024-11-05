import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchPictures = async () => {
    try {
        const response = await axios.get(`${API_URL}/pictures`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pictures:", error);
        throw error; 
    }
};

export const fetchPictureById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/pictures/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching picture by id:", error);
        throw error; 
    }
};

