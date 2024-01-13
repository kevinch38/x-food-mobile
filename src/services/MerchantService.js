import axios from 'axios';

const MerchantService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const fetchMerchants = async () => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/active`,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    const fetchMerchantById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/${id}`,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    return { fetchMerchants, fetchMerchantById };
};

export default MerchantService;
