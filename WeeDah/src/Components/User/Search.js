import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Navigator from "react-native-navigation";

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
    this.props.navigator.showModal({
      screen: "Login", // unique ID registered with Navigation.registerScreen
      title: "Modal", // title of the screen as appears in the nav bar (optional)
      passProps: {}, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
        <Button
          title="Click"
          onPress={() => {
            this.gg();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
export default Search;
