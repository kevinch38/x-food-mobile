import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';

const Loading = ({ style }) => {
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                },
                { style },
            ]}
        >
            <ActivityIndicator color={Color.primary} size={'large'} />
        </View>
    );
};

export default Loading;
