import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

class Drawer extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Drawer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.7
  }
});
export default Drawer;
