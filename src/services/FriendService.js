import axios from 'axios';

const FriendService = () => {
    const fetchFriend = async (accountID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/friends?accountID=${accountID}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg5NTg3OSwiaWF0IjoxNzA0ODg1MDc5LCJyb2xlIjoiUk9MRV9VU0VSIn0.1nQ5_98NH_34Ig0tLg78LM5H14y-aWubsBQIN4i4DVI',
                },
            },
        );
        console.log(data, 'friendService ====');
        return data;
    };

    return { fetchFriend };
};
export default FriendService;
