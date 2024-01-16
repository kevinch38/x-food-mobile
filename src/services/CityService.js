import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const CityService = () => {
    const fetchCities = async () => {
        const { data } = await axiosInstance.get(
            'http://10.0.2.2:8087/api/cities/jabodetabek',
        );
        return data;
    };

    return { fetchCities };
};

export default CityService;
