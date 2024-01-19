import { CommonActions } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../assets/Color';
import image from '../../assets/images/logo-splash.png';
import { ServiceContext } from '../../context/ServiceContext';
import { setPhoneNumber } from '../../slices/uiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {
    const { authService } = useContext(ServiceContext);
    const dispatch = useDispatch();

    const checkTokenAndNavigate = async () => {
      try {
          const token = await authService.getTokenFromStorage();
          const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
          if(storedPhoneNumber) dispatch(setPhoneNumber(storedPhoneNumber));
          if (token) {
              setTimeout(() => {    
                  navigation.replace('Tabs');
              }, 3000);
          } else {
              setTimeout(() => {
                  navigation.dispatch(
                      CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'Welcome' }],
                      }),
                  );
              }, 3000);
          }
      } catch (error) {
          console.error('Error checking token:', error);
      }
  };

  useEffect(() => {
      checkTokenAndNavigate();
  }, [navigation]);


    return (
        <View style={styles.container}>
            <Image source={image} style={styles.logo} />
            <Text style={styles.title}>
                X<Text style={styles.secondTitle}>-Food</Text>
            </Text>
            <Text style={styles.teksColor}>
                Powered by
                <Text style={{ fontWeight: 'bold' }}>
                    {' '}
                    Bank Danamon Indonesia
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    teksColor: {
        color: '#FFFFFF',
    },
    secondTitle: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
});
