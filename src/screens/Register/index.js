import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext } from 'react';
import Color from '../../assets/Color';
import { CheckBox, Icon } from '@rneui/themed';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';

export default function Register({ navigation, noPhone }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);

    const Schema = yup.object().shape({
        firstName: yup
            .string()
            .matches('^[a-zA-Z0-9.]*$', 'Invalid Firstname')
            .required('First Name Required'),
        lastName: yup
            .string()
            .matches('^[a-zA-Z0-9.]*$', 'Invalid Lastname')
            .required('Last Name Required'),
        accountEmail: yup
            .string()
            .email('Email not valid')
            .required('Email required'),
        aggrement: yup
            .boolean()
            .oneOf([true], 'Anda harus menyutujui persyaratan'),
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: {
            firstName: '',
            phoneNumber: { noPhone },
            lastName: '',
            accountEmail: '',
            aggrement: false,
        },
        onSubmit: async (formValues) => {
            try {
                if (!formValues) return;

                const { aggrement, ...values } = formValues;

                dispatch(
                    userAction(async () => {
                        const result = await userService.register(values);
                        if (result.status === 201) {
                            navigation.navigate('Tabs');
                        }
                    }),
                );
            } catch (error) {
                console.error('Error:', error);
            }
        },
        validationSchema: Schema,
    });

    return (
        <SafeAreaView style={styles.wrapper}>
            <View>
                <Image
                    style={styles.wall2}
                    source={require('../../assets/images/rightTop.png')}
                />
            </View>
            <View>
                <Image
                    style={styles.wall1}
                    source={require('../../assets/images/leftTop2.png')}
                />
                <Image source={require('../../assets/images/leftTop1.png')} />
            </View>

            <Pressable style={styles.buttonBack}>
                <Text style={styles.backIcon}>
                    <Icon
                        color="#111719"
                        name="chevron-left"
                        size={22}
                        type="fontawsome"
                    />
                </Text>
            </Pressable>
            <View>
                <Text style={styles.titleStyle}>Get Started</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <View>
                        <Text style={styles.labelStyle}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                            <Text style={styles.errorText}>
                                {errors.firstName}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={styles.labelStyle}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Doe"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                            <Text style={styles.errorText}>
                                {errors.lastName}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={styles.labelStyle}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="johndoe@address.com"
                            onChangeText={handleChange('accountEmail')}
                            onBlur={handleBlur('accountEmail')}
                            value={values.accountEmail}
                            keyboardType="email-address"
                        />
                        {touched.accountEmail && errors.accountEmail && (
                            <Text style={styles.errorText}>
                                {errors.accountEmail}
                            </Text>
                        )}
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            textStyle={{ color: '#C4C4C4' }}
                            title={
                                'I agree to our Terms and Conditions and Privacy Policy'
                            }
                            checked={values.aggrement}
                            onPress={() =>
                                setFieldValue('aggrement', !values.aggrement)
                            }
                            checkedColor="grey"
                        />
                        {touched.aggrement && errors.aggrement && (
                            <Text style={styles.errorTextAgg}>
                                {errors.aggrement}
                            </Text>
                        )}
                    </View>
                    <Pressable style={styles.button}>
                        <Text onPress={handleSubmit} style={styles.textStyle}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        backgroundColor: '#fff',
    },
    Submit: {
        backgroundColor: Color.primary,
    },
    wall1: {
        flex: 1,
        position: 'absolute',
    },
    wall2: {
        flex: 1,
        position: 'absolute',
        right: 0,
    },
    container: {
        height: '100%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        backgroundColor: Color.primary,
        padding: 10,
        width: 350,
    },
    buttonBack: {
        left: 20,
        top: '-3%',
        width: '10%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    backIcon: {
        width: 'auto',
    },
    labelStyle: {
        marginTop: 10,
        textAlign: 'left',
        fontWeight: '400',
        color: '#9796A1',
        fontSize: 16,
    },
    titleStyle: {
        textAlign: 'left',
        left: '5%',
        bottom: 0,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '20%',
    },
    checkBox: {
        width: '80%',
        margin: 0,
        color: '#C4C4C4',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    errorTextAgg: {
        color: 'red',
        marginVertical: 7,
        textAlign: 'center',
    },
    input: {
        color: '#C4C4C4',
        height: 65,
        width: 350,
        borderWidth: 1,
        fontSize: 17,
        padding: 15,
        marginBottom: 7,
        marginTop: 5,
        borderRadius: 10,
        borderColor: '#C4C4C4',
    },
});
