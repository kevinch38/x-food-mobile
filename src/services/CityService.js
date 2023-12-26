import axios from 'axios';

const CityService = () => {
    const fetchCities = async () => {
        const { data } = await axios.get('http://10.0.2.2:8087/api/cities');
        return data;
    };

    return { fetchCities };
};

export default CityService;
