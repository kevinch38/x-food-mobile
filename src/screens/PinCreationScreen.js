
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import PinCreationService from "../services/PinCreationService";
import {setPin} from "../slices/pinSlice";
import { useDispatch } from "react-redux";
import React, {useEffect} from 'react';
import Color from '../assets/Color';
import { BlurView } from 'expo-blur';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Home from "./Home";
import userService from "../services/UserService";

const PinSchema = Yup.object().shape({
    pinValue: Yup.string().required('PIN is required').length(6, 'PIN must be 6 digits'),
    confirmPinValue: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('pinValue')], 'PIN does not match'),
});

const PinCreationScreen = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [pinIDExists, setPinIDExists] = React.useState(false);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = "2c9290818c661605018c66169bae0002";
                const userData = await userService().fetchUserById(userId);

                if (userData.data && userData.data.pin) {
                    setPinIDExists(true);
                } else {
                    setPinIDExists(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const hideModal = () => {
        setModalVisible(true);
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            dispatch(setPin(values));
            hideModal();
            resetForm();
            const response =  await PinCreationService(values.pinValue);
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Home/>
            {!modalVisible && pinIDExists !== undefined && !pinIDExists &&  (
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
                <Modal animationType="slide" transparent={true} visible={!modalVisible && !pinIDExists} onRequestClose={hideModal}>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <View style={styles.modalView}>
                            <Text style={{marginBottom: 10, fontSize: 16}}>Create PIN for your Account</Text>

                            <Formik
                                initialValues={{pinValue: '', confirmPinValue: ''}}
                                validationSchema={PinSchema}
                                onSubmit={handleFormSubmit}>
                                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
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
                                            <Text style={{color: 'red', marginBottom: 20}}>{errors.pinValue}</Text>
                                        )}

                                        <TextInput
                                            style={styles.input}
                                            placeholder="Confirm PIN"
                                            secureTextEntry={true}
                                            keyboardType={'numeric'}
                                            onChangeText={handleChange('confirmPinValue')}
                                            onBlur={handleBlur('confirmPinValue')}
                                            value={values.confirmPinValue}
                                        />
                                        {touched.confirmPinValue && errors.confirmPinValue && (
                                            <Text style={{color: 'red', marginBottom: 20}}>{errors.confirmPinValue}</Text>
                                        )}

                                        <Pressable style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit}>
                                            <Text style={styles.textStyle}>Submit</Text>
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




