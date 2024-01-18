import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const CityService = () => {
    const fetchCities = async () => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/cities/jabodetabek`,
        );
        return data;
    };

    return { fetchCities };
};

export default CityService;
