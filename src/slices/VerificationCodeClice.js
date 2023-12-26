import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    otpID : "",
    otp : ""
}

const VerificationCodeSlice = createSlice({
    name : 'verification',
    initialState,
    reducers : {
        setVerificationCode : (state, action) => {

        }
    }
})
