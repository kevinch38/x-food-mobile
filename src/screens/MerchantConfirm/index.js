import {
    BackHandler,
    Button,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import { theme } from '../../theme';
import * as Progress from 'react-native-progress';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

function MerchantConfirm({ navigation }) {
    const route = useRoute();
    const data = route.params?.data;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Complete', { pointLoyalty: data.pointAmount });
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, []);

    const renderLoading = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: '20%' }}>
                <Progress.Circle
                    size={150}
                    endAngle={0.7}
                    strokeCap={'round'}
                    borderWidth={12}
                    indeterminate={true}
                    width={150}
                    color={'#F24E1E'}
                />
            </View>
        );
    };
    const renderHeader = () => {
        return (
            <View style={styles.imageController}>
                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/images/pin-image.png')}
                />
                <Text style={styles.title}>Payment Success!</Text>
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View style={[styles.imageController, { marginTop: '20%' }]}>
                <Text style={styles.subTitle}>
                    Awaiting Restaurant Order Confirmation
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            <View>
                {/*<Button*/}
                {/*    title={'hh'}*/}
                {/*    onPress={console.log(data, 'ini merchant confirm')}*/}
                {/*/>*/}
                {renderHeader()}
                {renderLoading()}
                {renderFooter()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    controller: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    imageController: {
        alignItems: 'center',
    },
    imageHeader: {
        width: 102,
        height: 93,
        marginTop: 46,
        marginBottom: 44,
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 30,
    },
    subTitle: {
        width: '80%',
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 20,
    },
    inputPin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputStyle: {
        width: 54,
        height: 54,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '500',
        color: theme.primary,
        marginTop: 62,
    },
    buttonForgotPin: {
        marginTop: 20,
        marginLeft: 31,
    },
    textForgotPin: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});
export default MerchantConfirm;
