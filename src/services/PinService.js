import axios from 'axios';

const PinService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const getPin = async (id) => {
        const { data } = await axios.get(`http://10.0.2.2:8087/api/pins/${id}`, {
            headers : {
                'Authorization' : apiKey
            }
        });
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axios.post(
            `http://10.0.2.2:8087/api/pins`,
            user,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    return { getPin, pinCheck };
};

export default PinService;
