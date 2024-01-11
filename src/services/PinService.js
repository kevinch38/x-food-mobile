import axios from 'axios';

const PinService = () => {
    const getPin = async (id) => {
        const { data } = await axios.get(`http://10.0.2.2:8087/api/pins/${id}`);
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axios.post(
            `http://10.0.2.2:8087/api/pins`,
            user,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                },
            },
        );
        return data;
    };

    return { getPin, pinCheck };
};

export default PinService;
