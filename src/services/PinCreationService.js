import axios from "axios";
import axiosInstance from "../api/axiosInstance";
const PinCreationService = async (pinID,pinValue) => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    try {
        const response = await axiosInstance.put(`http://10.0.2.2:8087/api/pins`, {
            pinID : pinID,
            pin : pinValue
        },
            {
                headers : {
                    'Authorization' : apiKey
                }
            });
        return response.data;
    }catch (error) {
        throw error;
    }
}
export default PinCreationService
