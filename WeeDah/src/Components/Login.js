import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import logoImage from "../Image/logo.png";
import backgroundImage from "../Image/background.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../Style/theme";
import vendorIcon from "../Image/vendorIcon.png";
import userIcon from "../Image/userIcon.png";

// import backgroundImage4 from "./src/image/background.jpg4";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.backImage} source={backgroundImage}>
          <View style={styles.alphaContainer}>
            <Image style={styles.logo} source={logoImage} />
            <Text style={styles.logoText}>WeeDah</Text>

            <Text style={styles.slogan}>" မြန်မြန် လွယ်လွယ် စားကြမယ် "</Text>
            <View style={styles.divider} />
            <TouchableOpacity
              style={[styles.btn, styles.user_btn]}
              onPress={() => {}}
            >
              <Image source={vendorIcon} style={styles.icon} />
              <Text style={[styles.btn_text, styles.user_btn_text]}>
                ဝယ်စားမယ်
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.vendor_btn]}
              onPress={() => {}}
            >
              <Image source={userIcon} style={styles.icon} />
              <Text style={[styles.btn_text, styles.vendor_btn_text]}>
                ရောင်းမယ်
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 45,
    width: 45
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backImage: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  slogan: {
    marginTop: 65,
    fontSize: 25,
    color: "white"
  },
  logoText: {
    fontSize: 34,
    color: "white",
    fontFamily: "Verdana"
  },
  alphaContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    alignItems: "center"
  },
  textContainer: {},
  logo: {
    marginTop: 50,
    width: 165,
    height: 100
  },
  btn: {
    marginTop: 10,
    flexDirection: "row",
    width: 260,
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  btn_text: {
    fontSize: 23,
    textAlign: "center"
  },
  user_btn: {
    backgroundColor: theme.mainColor
  },
  user_btn_text: {
    color: theme.fontColor2
  },
  vendor_btn: {
    backgroundColor: theme.greenColor
  },
  vendor_btn_text: {
    color: theme.fontColor2
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#718093",
    borderRadius: 0.5,
    marginTop: 25,
    marginBottom: 35
  }
});
