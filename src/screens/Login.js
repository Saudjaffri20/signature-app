import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [usernameText, setUsernameText] = useState(false);
  const [passwordText, setPasswordText] = useState(false);

  useEffect(() => {
    console.log(route.params?.value, "routes params --------");
    setUsername("");
    setPassword("");
    setUsernameText(false);
    setPasswordText(false);
    setPasswordIcon(false);
  }, [route.params?.value]);

  const userLogin = async () => {
    try {
      if (username != "" && password != "") {
        const res = await axios.post(
          "https://emrtest.genensys.com/therapy/login",
          { user: username, password: password }
        );
        if (res.data.token != null) {
          await AsyncStorage.setItem("Authorization", res.data.token);
          navigation.navigate({
            name: "Home",
          });
          setUsername("");
          setPassword("");
          setUsernameText(false);
          setPasswordText(false);
        } else {
          setUsernameText(true);
          setPasswordText(true);
        }
        console.log("login Sucessfull");
      } else {
        setUsernameText(true);
        setPasswordText(true);
      }
    } catch (error) {
      console.log(error, "=================");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image style={{}} source={require("../assets/images/mainLogo.png")} />
        </View>
        <Text style={styles.logoTitle}>Sign In</Text>
        <View style={[styles.inputContainer, { marginTop: 0 }]}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            onChangeText={(username) => { setUsername(username);  setUsernameText(false)}}
            placeholderTextColor="#5C5C5C"
            value={username}
            style={styles.input}
            placeholder="Enter Name"
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 15 }]}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              onChangeText={(password) => {setPassword(password); setPasswordText(false)}}
              placeholderTextColor="#5C5C5C"
              value={password}
              style={styles.input}
              placeholder="**********"
              secureTextEntry={passwordIcon ? false : true}
            />
            <Feather
              name={passwordIcon ? "eye" : "eye-off"}
              size={18}
              color="black"
              style={{ position: "absolute", right: 15, top: height * 0.022 }}
              onPress={() => setPasswordIcon(!passwordIcon)}
            />
          </View>
        </View>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontSize: 14,
              fontWeight: "700",
              marginTop: height * 0.03,
            }}
          >
            {
              usernameText && passwordText && (
                "Invalid Credentials"
              )
            }
          </Text>
        <View style={[styles.buttonContainer, { marginTop: 0 }]}>
          <TouchableOpacity style={styles.button} onPress={userLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0F2F5",
  },
  loginContainer: {
    width: width * 0.9,
    paddingTop: height * 0.1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 30,
    color: "#5C5C5C",
    fontWeight: "bold",
    marginTop: height * 0.08,
    marginBottom: height * 0.08,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#5C5C5C",
    marginBottom: 7,
  },
  input: {
    width: width * 0.9,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    height: 50,
    paddingLeft: 15,
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "rgba(80, 137, 227, 1)",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginTop: height * 0.03,
    borderRadius: 100,
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;
