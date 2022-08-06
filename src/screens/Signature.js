import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  StatusBar,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Signature from "react-native-signature-canvas";

const { width, height } = Dimensions.get("window");

const SignatureScreen = ({ navigation, route }) => {

  const [appointmentID, setAppointmentID] = useState(null);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);

  useEffect(() => {
    setAppointmentID(route.params.value);
  }, []);

  const handleOK = (sign) => {
    if (sign !== null) {
      updateSignatureApi(sign);
      setModalVisibleSuccess(true);
    }
  };

  const handleClear = () => {
    console.log("Clear");
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const updateSignatureApi = async (sign) => {
    const token = await AsyncStorage.getItem("Authorization");
    const response = await axios({
      method: "PUT",
      headers: {
        Authorization: token,
      },
      data: {
        apptId: appointmentID,
        signature: sign,
      },
      url: "https://emrtest.genensys.com/therapy/saveSignature",
    });
    console.log("get Updated data");
  };

  const handleClearModal = () => {
    navigation.navigate({
        name : 'Home',
        params: {value : new Date().getTime() + 24 * 60 * 60 * 1000},
        merge :  true,
    });
    setModalVisibleSuccess(false);
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar  />
      <View>
        <Text style={styles.titleApp}>Please Sign Below</Text>
      </View>
      <View>
        <View style={styles.signatureContainer}>
          <Signature
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            descriptionText=""
            clearText="Clear"
            confirmText="Save"
          />
        </View>
      </View>

      <Modal
        style={{}}
        animationType="slide"
        visible={modalVisibleSuccess}
      >
        <View style={styles.centeredView}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { height: 300 }]}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  handleClearModal();
                }}
              >
                <AntDesign name="closecircle" size={22} color="black" />
              </Pressable>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <AntDesign
                  name="checkcircle"
                  size={50}
                  color="rgba(80, 137, 227, 1)"
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    color: "#5C5C5C",
                    fontWeight: "500",
                  }}
                >
                  Sucessfully saved signature
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },

  titleApp: {
    fontSize: 22,
    color: "#5C5C5C",
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 40,
    textAlign: "center",
  },

  signatureContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
    height: 380,
    width: width * 0.95,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "#fff",
    height: 420,
    width: width * 0.95,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

  buttonClose: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    //   marginHorizontal : 5,
    //   marginVertical : 10
    //   backgroundColor  : 'yellow'
  },

  signoutBtn: {
    flexDirection: "row",
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(80, 137, 227, 1)",
    height: 50,
    // flex: 1,
    // marginLeft : width * .05,
    // borderRadius : 5,
    // justifyContent: 'flex-end',
  },
});

export default SignatureScreen;
