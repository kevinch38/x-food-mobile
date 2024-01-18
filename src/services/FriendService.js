import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const FriendService = () => {
    const fetchFriend = async (accountID) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/friends?accountID=${accountID}`,
        );
        return data;
    };

    const addFriend = async (friend) => {
        const request = {
            accountID1: friend.userId,
            accountID2: friend.friendId,
        };
        const { data } = await axiosInstance.post(
            `${apiBaseUrl}/api/friends`,
            request,
        );
        return data;
    };

    return { fetchFriend, addFriend };
};
export default FriendService;
