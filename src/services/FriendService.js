import axios from 'axios';
import token from './Token';

const FriendService = () => {
    const fetchFriend = async (accountID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/friends?accountID=${accountID}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    return { fetchFriend };
};
export default FriendService;
