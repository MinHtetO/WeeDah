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
import vendorIcon from "../Image/vendorIcon.png";
import userIcon from "../Image/userIcon.png";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import { theme } from "../Style/theme";
import vendor from "../globalData";

// import backgroundImage4 from "./src/image/background.jpg4";

export default class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  goUser() {
    const startTabs = async () => {
      const infoIcon = await Icon.getImageSource(
        "ios-information-circle-outline",
        30
      );
      const toggleIcon = await Icon.getImageSource("ios-menu", 30);
      const mapIcon = await Icon.getImageSource("ios-map-outline", 30);
      const searchIcon = await Icon.getImageSource("ios-search", 30);

      let navButton = {
        leftButtons: [
          {
            title: "Menu",
            id: "toggle",
            buttonColor: theme.mainColor
          }
        ],
        rightButtons: [
          {
            title: "Info",
            id: "info",
            buttonColor: theme.mainColor
          }
        ]
      };
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: "Map", // tab label as appears under the icon in iOS (optional)
            screen: "UserMap", // unique ID registered with Navigation.registerScreen
            icon: mapIcon, // local image asset for the tab icon unselected state (optional on iOS)
            title: "Map", // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
            navigatorButtons: navButton // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
          },
          {
            label: "Search",
            screen: "UserSearch",
            icon: searchIcon,
            title: "Search",
            navigatorButtons: navButton
          }
        ],
        tabsStyle: {
          // optional, add this if you want to style the tab bar beyond the defaults
          tabBarButtonColor: theme.fontColor, // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
          tabBarSelectedButtonColor: theme.mainColor,
          tabBarBackgroundColor: "white", // optional, change the background color of the tab bar
          initialTabIndex: 0 // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
        },
        drawer: {
          // optional, add this if you want a side menu drawer in your app
          left: {
            // optional, define if you want a drawer from the left
            screen: "Drawer", // unique ID registered with Navigation.registerScreen
            passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
            fixedWidth: 500 // a fixed width you want your left drawer to have (optional)
          }
        },
        animationType: "slide-down" // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
      });
    };

    startTabs();
  }

  goVendor() {
    console.log(vendor.id);
    vendor.id = 206;
    this.props.navigator.resetTo({
      screen: "VendorMain", // unique ID registered with Navigation.registerScreen
      title: "Wee Dah", // navigation bar title of the pushed screen (optional)
      passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: "fade" // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
    });
  }

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
              onPress={() => this.goUser()}
            >
              <Image source={vendorIcon} style={styles.icon} />
              <Text style={[styles.btn_text, styles.user_btn_text]}>
                ဝယ်စားမယ်
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.vendor_btn]}
              onPress={() => this.goVendor()}
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
