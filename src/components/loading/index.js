import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';

const Loading = () => {
    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator color={Color.primary} size={'large'} />
        </View>
    );
};

export default Loading;
