import React, {useState} from 'react'
import {Text, View, StatusBar, StyleSheet, Dimensions, Pressable, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, Modal} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Signature from "react-native-signature-canvas";


const { width, height } = Dimensions.get('window');

const SignatureModal = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [signature, setSign] = useState(null);

    const handleOK = (signature) => {
        setSign(signature);
        setModalVisible(!modalVisible);
    };

    const handleEmpty = () => {
        console.log("Empty");
    };


    return (
        <Modal
            style={{}}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <AntDesign 
                                name="closecircle" 
                                size={22} 
                                color="black" 
                            />
                        </Pressable>
                        <Signature
                            style={{backgroundColor : 'red'}}
                            onOK={handleOK}
                            onEmpty={handleEmpty}
                            descriptionText="Sign"
                            clearText="Clear"
                            confirmText="Save"
                            // webStyle={style}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}




const styles = StyleSheet.create({
    
    centeredView : {
        flex : 1,
        backgroundColor : '#F0F2F5',
        justifyContent : 'center',
        alignItems : 'center'
    },

    modalView: {
        backgroundColor : '#fff',
        height : 420,
        width : width * .95,
        borderRadius : 5,
        padding  : 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
      },

      buttonClose : {
          alignSelf : 'flex-end',
          justifyContent : 'flex-end',
          marginHorizontal : 5,
          marginVertical : 10
      },
 
});

export default SignatureModal