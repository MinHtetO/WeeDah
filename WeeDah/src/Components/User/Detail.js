import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import phoneicon from "../../Image/phoneIcon.png";
import { theme } from "../../Style/theme";
class Detail extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  dismiss = () => {
    console.log("gg");
    Navigation.dismissLightBox();
  };
  goPhone = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Icon
          style={styles.closeBtn}
          onPress={this.dismiss}
          name="ios-close"
          size={45}
          color="#900"
        />
        <Text style={styles.font}>ဘာဘူလေး</Text>
        <Text style={styles.font}>အကြော်စုံ</Text>
        <View style={styles.divider} />
        <Text style={styles.font}>2.6 km from here</Text>
        <TouchableOpacity
          style={[styles.btn, styles.user_btn]}
          onPress={() => this.goPhone()}
        >
          <Image source={phoneicon} style={styles.icon} />
          <Text style={[styles.btn_text, styles.user_btn_text]}>
            ဖုန်းဆက်မယ်
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 10
  },
  btn: {
    marginTop: 30,
    flexDirection: "row",
    width: 220,
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  user_btn: {
    backgroundColor: theme.greenColor
  },
  user_btn_text: {
    color: theme.fontColor2
  },
  btn_text: {
    fontSize: 22,
    textAlign: "center"
  },
  icon: {
    height: 33,
    width: 33
  },
  font: {
    marginTop: 20,
    fontSize: 18
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
export default Detail;
