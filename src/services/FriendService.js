import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const FriendService = () => {
    const fetchFriend = async (accountID) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/friends?accountID=${accountID}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiI4YThhZTQ3NThjZDk0NDUzMDE4Y2Q5NDRlOTVhMDAwNCIsImV4cCI6MTcwNDk5MjY1NCwiaWF0IjoxNzA0OTgxODU0LCJyb2xlIjoiUk9MRV9VU0VSIn0.qV9Fdws4loOkSbHlP2mMMWE0AnRvRz09EkR1qnXaGi4',
                },
            },
        );
        console.log(data, 'friendService ====');
        return data;
    };

    const addFriend = async (friend) => {
        const request = {
            accountID1: friend.userId,
            accountID2: friend.friendId,
        };
        console.log(request)
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/friends',
            request,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiI4YThhZTQ3NThjZDk0NDUzMDE4Y2Q5NDRlOTVhMDAwNCIsImV4cCI6MTcwNTAzNzA3NywiaWF0IjoxNzA1MDI2Mjc3LCJyb2xlIjoiUk9MRV9VU0VSIn0.IsT4LdaSPRuE_c2MBGWaUZChpEfcI7gcr5vWFQKSwzE',
                },
            },
        );
        console.log(data)
        return data;
    };

    return { fetchFriend, addFriend };
};
export default FriendService;
