import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const FriendService = () => {
    const fetchFriend = async (accountID) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/friends?accountID=${accountID}`,
        );
        return data;
    };

    const addFriend = async (friend) => {
        const request = {
            accountID1: friend.userId,
            accountID2: friend.friendId,
        };
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/friends',
            request,
        );
        return data;
    };

    return { fetchFriend, addFriend };
};
export default FriendService;
