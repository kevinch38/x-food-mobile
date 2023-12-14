import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useState } from 'react';
import BackButton from '../../components/backButton';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import InputText from '../../components/inputText';
import DateTimePicker from '@react-native-community/datetimepicker';

function CompleteProfile({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleBack = () => {
        navigation.navigate('Profile');
    };

    const handleChangePin = () => {
        console.log('Create/Change PIN');
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
                    <Text style={styles.title}>Profile Info</Text>
                </View>

                <View style={styles.wrapperInput}>
                    <View>
                        <Text style={styles.textSecondary}>NIK</Text>
                        <InputText
                            placeholder={'3347891801970001'}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSecondary}>Date of Birth</Text>
                        <InputText
                            value={date.toLocaleDateString()}
                            showSoftInputOnFocus={false}
                            onPressIn={showDatepicker}
                        />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                onChange={onChange}
                                minimumDate={new Date(1950, 0, 1)}
                                maximumDate={new Date(2030, 11, 31)}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={styles.textSecondary}>City</Text>
                        <InputText placeholder={'Jakarta'} />
                    </View>
                    <View>
                        <Text style={styles.textSecondary}>Pin</Text>
                        <Text
                            onPress={handleChangePin}
                            style={styles.changePin}
                        >
                            Create/Change PIN
                        </Text>
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
    title: {
        marginTop: 60,
        fontWeight: '500',
        fontSize: 18,
    },
    dateTime: {
        width: 340,
        height: 60,
    },
    wrapperButton: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 60,
    },
    wrapperInput: {
        paddingHorizontal: 18,
        marginTop: 40,
    },
    wrapperDate: {
        height: 65,
        borderWidth: 1,
        marginTop: 9,
        borderRadius: 10,
        paddingHorizontal: 6,
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'start',
        borderColor: theme.grey,
    },
    textSecondary: {
        marginTop: 29,
        color: theme.grey,
        fontWeight: '400',
        fontSize: 16,
    },
    customButton: {
        backgroundColor: Color.secondary,
        fontWeight: '900',
        fontSize: 15,
    },
    changePin: {
        marginTop: 9,
        fontWeight: '900',
        fontSize: 15,
        color: theme.secondary,
    },
});
export default CompleteProfile;
