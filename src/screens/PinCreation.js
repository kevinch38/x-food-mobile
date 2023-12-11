//
// import React, { useState } from 'react';
// import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
// import Color from "../assets/Color";
//
// const PinCreation = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [pinValue, setPinValue] = useState('');
//     const [confirmPinValue, setConfirmPinValue] = useState('');
//     const [pinMatchError, setPinMatchError] = useState('');
//
//     const showModal = () => {
//         setModalVisible(true);
//         setPinValue('');
//         setConfirmPinValue('');
//         setPinMatchError('');
//     };
//
//     const hideModal = () => {
//         if (pinValue === confirmPinValue) {
//             setModalVisible(false);
//             setPinMatchError('');
//         } else {
//             setPinMatchError('PIN does not match.');
//         }
//     };
//
//     return (
//         <View style={styles.centeredView}>
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     setModalVisible(false);
//                 }}>
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={{ marginBottom: 10, fontSize: 16 }}>Create PIN for your Account</Text>
//                         <Text style={{ marginBottom: 10 }}>6 Digit Security Pin</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter PIN"
//                             secureTextEntry={true}
//                             keyboardType={'numeric'}
//                             value={pinValue}
//                             onChangeText={(text) => setPinValue(text)}
//                         />
//                         <Text style={{ marginBottom: 10 }}>Confirm PIN</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Confirm PIN"
//                             secureTextEntry={true}
//                             keyboardType={'numeric'}
//                             value={confirmPinValue}
//                             onChangeText={(text) => setConfirmPinValue(text)}
//                         />
//                         {pinMatchError ? (
//                             <Text style={{color:"red", marginBottom:20}}>{pinMatchError}</Text>
//                         ) : null}
//                         <Pressable
//                             style={[styles.button, styles.buttonClose]}
//                             onPress={hideModal}>
//                             <Text style={styles.textStyle}>Submit</Text>
//                         </Pressable>
//
//                     </View>
//                 </View>
//             </Modal>
//             <Pressable
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={showModal}>
//                 <Text style={styles.textStyle}>Create Pin</Text>
//             </Pressable>
//         </View>
//     );
// };
//
//
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: Color.primary,
//     },
//     buttonClose: {
//         backgroundColor: Color.secondary,
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//
//     input: {
//         height: 50,
//         borderWidth: 0.3,
//         padding: 5,
//         borderRadius: 10,
//         marginBottom: 20,
//         width: 250,
//
//     },
// });
//
// export default PinCreation;
//

import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Color from "../assets/Color";

const PinCreation = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pinValue, setPinValue] = useState('');
    const [confirmPinValue, setConfirmPinValue] = useState('');
    const [pinMatchError, setPinMatchError] = useState('');

    const showModal = () => {
        setModalVisible(true);
        setPinValue('');
        setConfirmPinValue('');
        setPinMatchError('');
    };

    const hideModal = () => {
        if (pinValue === confirmPinValue) {
            setModalVisible(false);
            setPinMatchError('');
        } else {
            setPinMatchError('PIN does not match.');
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <BlurView
                    style={styles.blurView}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ marginBottom: 10, fontSize: 16 }}>Create PIN for your Account</Text>
                            <Text style={{ marginBottom: 10 }}>6 Digit Security Pin</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter PIN"
                                secureTextEntry={true}
                                keyboardType={'numeric'}
                                value={pinValue}
                                onChangeText={(text) => setPinValue(text)}
                            />
                            <Text style={{ marginBottom: 10 }}>Confirm PIN</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm PIN"
                                secureTextEntry={true}
                                keyboardType={'numeric'}
                                value={confirmPinValue}
                                onChangeText={(text) => setConfirmPinValue(text)}
                            />
                            {pinMatchError ? (
                                <Text style={{ color: "red", marginBottom: 20 }}>{pinMatchError}</Text>
                            ) : null}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={hideModal}>
                                <Text style={styles.textStyle}>Submit</Text>
                            </Pressable>

                        </View>
                    </View>
                </BlurView>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={showModal}>
                <Text style={styles.textStyle}>Create Pin</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default PinCreation;
