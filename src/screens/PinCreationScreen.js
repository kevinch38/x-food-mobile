
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Color from '../assets/Color';
import {setPin} from "../slices/pinSlice";
import axios from "axios";

const PinSchema = Yup.object().shape({
    pinValue: Yup.string().required('PIN is required').length(6, 'PIN must be 6 digits'),
    confirmPinValue: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('pinValue')], 'PIN does not match'),
});

const PinCreationScreen = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(true); // Set modalVisible to true initially

    useEffect(() => {
        return () => setModalVisible(false);
    }, []);

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            dispatch(setPin(values));
            hideModal();
            resetForm();
            const response = await axios.put('http://10.0.2.2:8080/api/pins', {
                pinValue: values.pinValue,
            });

            console.log('API Response:', response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    };
    const pinState = useSelector((state) => state.pin);

    console.log('Pin State:', pinState);

    return (
        <View style={styles.centeredView}>
            {modalVisible && (
                <BlurView
                    intensity={80}
                    tint="light"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 2,
                    }}
                />
            )}

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ marginBottom: 10, fontSize: 16 }}>Create PIN for your Account</Text>

                        <Formik
                            initialValues={{ pinValue: '', confirmPinValue: '' }}
                            validationSchema={PinSchema}
                            onSubmit={handleFormSubmit}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                                        <Text style={{ color: 'red', marginBottom: 20 }}>{errors.pinValue}</Text>
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
                                        <Text style={{ color: 'red', marginBottom: 20 }}>{errors.confirmPinValue}</Text>
                                    )}

                                    <Pressable style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit}>
                                        <Text style={styles.textStyle}>Submit</Text>
                                    </Pressable>

                                    <Pressable style={[styles.button, styles.buttonClose]} onPress={hideModal}>
                                        <Text style={styles.textStyle}>Cancel</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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




