import axios from 'axios';
import token from './Token';

const CityService = () => {
    const fetchCities = async () => {
        const { data } = await axios.get('http://10.0.2.2:8087/api/cities', {
            headers: {
                Authorization: token,
            },
        });
        return data;
    };

    return { fetchCities };
};

export default CityService;
