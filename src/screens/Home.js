import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  AppState,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  Modal,
} from "react-native";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation, route }) => {
  const [getAppointment, setGetAppointment] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    appointmentApi();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);


  useEffect(() => {
    if (route.params?.value != undefined) {
      console.log(route.params?.value, '%^&*======');
      appointmentApi();
      route.params.value = ''
    }
  }, [route.params?.value]);

  const appointmentApi = async () => {
    const token = await AsyncStorage.getItem("Authorization");
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var ddt = String(currentDate.getDate()).padStart(2, "0");
    var dd = String(new Date().getDate()).padStart(2, "0");
    var mm = String(new Date().getMonth() + 1).padStart(2, "0");
    var yyyy = new Date().getFullYear();

    const response = await axios({
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        from: `${yyyy}-${mm}-${dd}`,
        to: `${yyyy}-${mm}-${ddt}`,
        // "from" : '2022-06-22',
        // "to"   : '2022-06-23'
      },
      url: "https://emrtest.genensys.com/therapy/appointments",
    });

    setGetAppointment(response?.data?.data);
    console.log("getAppointment data");
  };

  // if (route.params) {
  //   console.log(route, '===')
  //   appointmentApi();
  //   route.params = null;
  // }


  const logout = async () => {
    await AsyncStorage.removeItem("Authorization");
    navigation.navigate({
      name: "Login",
      params: { value: new Date().getTime() + 24 * 60 * 60 * 1000 },
      merge: true,
    });
  };

  if (appStateVisible === "background") {
    console.log("--------");
    logout();
  }

  const handleSubmitNext = (id) => {
    navigation.navigate({
      name: "Signature",
      params: { value: id },
      merge: true,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <View>
          <Image
            style={{ height: 60, width: 60, borderRadius: 100 }}
            source={require("../assets/images/user.jpg")}
          />
        </View>
        <View style={styles.detailView}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a" }}>
            {item.patientName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 0,
              fontWeight: "600",
              color: "#5C5C5C",
            }}
          >
            {item.appt_time}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            handleSubmitNext(item.app_id);
          }}
        >
          {/* <FontAwesome5 name="file-signature" size={24} color="black" /> */}
          <FontAwesome5
            name="file-signature"
            size={34}
            color={
              item.hasSignature != "true" ? "black" : "rgba(80, 137, 227, 1)"
            }
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.homeContainer}>

      <StatusBar translucent={true} barStyle="dark-content" backgroundColor="#ecf0f1" />

      <View>
        <View style={styles.searchBar}>
          <AntDesign name="search1" size={22} color="grey" />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder="Search"
          />
        </View>
        <Text style={styles.titleApp}>Today's Appointment</Text>
        <View
          style={{ marginTop: 20, paddingBottom: 10, height: height * 0.8 }}
        >
          <FlatList
            data={getAppointment}
            renderItem={renderItem}
            keyExtractor={(item) => item.app_id}
          />
        </View>
      </View>

      <Pressable style={styles.signoutBtn} onPress={() => logout()}>
        <FontAwesome name="sign-out" size={24} color="#fff" />
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "700",
            paddingLeft: 10,
          }}
        >
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },

  searchBar: {
    color: "#F0F2F5",
    borderBottomWidth: 1,
    borderBottomColor: "#5C5C5C",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F0F2F5",
  },

  input: {
    paddingLeft: 10,
    fontSize: 18,
  },

  titleApp: {
    fontSize: 22,
    color: "#5C5C5C",
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
  },

  listContainer: {
    width: width * 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },

  detailView: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 7,
  },

  signoutBtn: {
    flexDirection: "row",
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(80, 137, 227, 1)",
    paddingVertical : 12 
  },

  modalButton : {
    alignSelf : "center"
  }
});

export default Home;
