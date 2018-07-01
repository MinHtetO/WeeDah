import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

class Search extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  onNavigatorEvent = event => {
    console.log("event");
    if (event.type === "NavBarButtonPress") {
      if (event.id === "toggle") {
        console.log("toggle");
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };
  gg() {
    Navigation.showLightBox({
      screen: "Drawer", // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "red", // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
export default Search;
