
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import PinCreationService from "../services/PinCreationService";
import {setPin} from "../slices/pinSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from 'react';
import Color from '../assets/Color';
import { BlurView } from 'expo-blur';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Home from "./Home";
import UserService from '../services/UserService';


const PinSchema = Yup.object().shape({
    pinValue: Yup.string().required('PIN is required').length(6, 'PIN must be 6 digits'),
    confirmPinValue: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('pinValue')], 'PIN does not match'),
});

const PinCreationScreen = ({ navigation }) => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [pinIDExists, setPinIDExists] = React.useState(false);
    const userService = UserService();
    const [pinID, setPinID]= useState("")


    useEffect(() => {
        fetchPinID();
        fetchUserData(phoneNumber);
    }, [phoneNumber, pinID]);

        const fetchUserData = async (phoneNumber) => {
            try {
                const userData = await userService.fetchUserByPhoneNumber(phoneNumber);
                console.log('userData:', userData);

                    setPinID(userData.data.pinID);

            } catch (error) {
                console.error('Error fetching user data1:', error);
            }
        };

    const fetchPinID = async () => {
        try {
            const currentPinID = pinID || '';

            const pinData = await userService.fetchPinByPinID(currentPinID);
            console.log("ini adalah pin data =============", pinData.data.pin);

            if (pinData.data.pin !== "") {
                setPinIDExists(true);
            } else {
                setPinIDExists(false);
            }
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    const hideModal = () => {
        setModalVisible(true);
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values.pinValue);
        try {
            dispatch(setPin(values));
            hideModal();
            resetForm();
            const response = await PinCreationService(pinID,values.pinValue);
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Home navigation={navigation} />
            {!modalVisible && pinIDExists !== undefined && !pinIDExists && (
                <BlurView
                    intensity={20}
                    tint="light"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 2,
                    }}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={!modalVisible && !pinIDExists}
                onRequestClose={hideModal}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={{ marginBottom: 10, fontSize: 16 }}>
                            Create PIN for your Account
                        </Text>

                        <Formik
                            initialValues={{
                                pinValue: '',
                                confirmPinValue: '',
                            }}
                            validationSchema={PinSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                            }) => (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter PIN"
                                        secureTextEntry={true}
                                        keyboardType={'numeric'}
                                        onChangeText={handleChange('pinValue')}
                                        onBlur={handleBlur('pinValue')}
                                        value={values.pinValue}
                                    />
                                    {touched.pinValue && errors.pinValue && (
                                        <Text
                                            style={{
                                                color: 'red',
                                                marginBottom: 20,
                                            }}
                                        >
                                            {errors.pinValue}
                                        </Text>
                                    )}

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm PIN"
                                        secureTextEntry={true}
                                        keyboardType={'numeric'}
                                        onChangeText={handleChange(
                                            'confirmPinValue',
                                        )}
                                        onBlur={handleBlur('confirmPinValue')}
                                        value={values.confirmPinValue}
                                    />
                                    {touched.confirmPinValue &&
                                        errors.confirmPinValue && (
                                            <Text
                                                style={{
                                                    color: 'red',
                                                    marginBottom: 20,
                                                }}
                                            >
                                                {errors.confirmPinValue}
                                            </Text>
                                        )}

                                    <Pressable
                                        style={[
                                            styles.button,
                                            styles.buttonSubmit,
                                        ]}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={styles.textStyle}>
                                            Submit
                                        </Text>
                                    </Pressable>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: Color.primary,
    },
    buttonClose: {
        backgroundColor: Color.secondary,
        marginTop:20
    },
    buttonSubmit: {
        backgroundColor: Color.primary,
        marginTop:20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    input: {
        height: 50,
        borderWidth: 0.3,
        padding: 5,
        borderRadius: 10,
        marginBottom: 20,
        width: 250,

    },
});

export default PinCreationScreen;




