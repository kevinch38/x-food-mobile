import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import bgProfile from '../../assets/images/bg-profile.png';
import photo from '../../assets/images/profile.png';
import camera from '../../assets/icons/camera.png';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import InputText from '../../components/inputText';

function EditProfile({ navigation }) {
    const handleBack = () => {
        navigation.navigate('Profile');
    };

    const handleSave = () => {
        console.log('Save');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <BackButton onPress={handleBack} />
                <View style={{ alignItems: 'center' }}>
                    <Image source={bgProfile} style={styles.bgProfile} />
                </View>

                <View style={styles.wrapperProfile}>
                    <View style={styles.outerCircle}>
                        <Image source={photo} style={styles.photo} />
                        <View style={styles.wrapperCamera}>
                            <Image source={camera} style={styles.iconCamera} />
                        </View>
                    </View>
                </View>

                <View style={styles.wrapperName}>
                    <Text style={styles.name}>Eljad Eendaz</Text>
                </View>

                <View style={styles.wrapperInput}>
                    <View>
                        <Text style={styles.textSecondary}>Full name</Text>
                        <InputText placeholder={'Eljad Eendaz'} />
                    </View>
                    <View>
                        <Text style={styles.textSecondary}>E-mail</Text>
                        <InputText placeholder={'prelookstudio@gmail.com'} />
                    </View>
                    <View>
                        <Text style={styles.textSecondary}>Phone Number</Text>
                        <InputText
                            placeholder={'081201234321'}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>

                <View style={styles.wrapperButton}>
                    <Button
                        title={'Save'}
                        style={styles.customButton}
                        onPress={handleSave}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    wrapperName: {
        alignItems: 'center',
        marginTop: 55,
    },
    wrapperCamera: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 27,
        height: 27,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        bottom: 2,
    },
    wrapperButton: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 60,
    },
    wrapperProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 154,
    },
    wrapperInput: {
        paddingHorizontal: 18,
    },
    outerCircle: {
        position: 'absolute',
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
    },
    bgProfile: {
        marginTop: -23,
        resizeMode: 'contain',
        width: 378,
        height: 285,
        position: 'absolute',
    },
    photo: {
        position: 'absolute',
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        margin: 9,
    },
    iconCamera: {
        width: 11,
        height: 9.9,
    },
    name: {
        fontWeight: '900',
        fontSize: 20,
        marginTop: 13,
    },
    textSecondary: {
        marginTop: 29,
        color: theme.grey,
        fontWeight: 400,
        fontSize: 16,
    },
    customButton: {
        backgroundColor: Color.secondary,
        fontWeight: 900,
        fontSize: 15,
    },
});
export default EditProfile;
