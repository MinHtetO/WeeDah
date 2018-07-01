import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import vendor from "../../globalData";
import pushLoc from "./LocationPush";
import { Socket } from "../../WebSocket/PheonixSocket";
class VendorMain extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    locationChosen: false,
    markers: [
      {
        title: "hello1",
        coordinates: {
          latitude: 37.78583,
          longitude: -122.40641
        }
      },
      {
        title: "hello2",
        coordinates: {
          latitude: 37.785834,
          longitude: -122.406415
        }
      }
    ],
    sellState: false
  };

  constructor(props) {
    super(props);
    console.log("inside vendor");
    console.log(vendor.id);
  }

  // changeCoor = () => {
  //   this.setState(prevState => {
  //     return {
  //       markers: prevState.markers.map(marker => {
  //         return {
  //           title: marker.title,
  //           coordinates: {
  //             latitude: marker.coordinates.latitude + 0.00000009,
  //             longitude: marker.coordinates.longitude + 0.0000009
  //           }
  //         };
  //       })
  //     };
  //   });
  // };

  toggle = () => {};
  sell = () => {};

  stop = () => {};

  getLocationHandler = () => {
    const TIMEOUT = 100000;
    const URL = vendor.socketUrl;
    const LOBBY = "room:lobby";
    console.log("before URL");
    console.log(URL);
    const socket = new Socket(URL);
    console.log(socket);
    socket.onOpen(event => console.log("Connected."));
    socket.onError(event => console.log("Cannot connect."));
    socket.onClose(event => console.log("Goodbye."));
    console.log("before connect");
    socket.connect();
    console.log("after connect");
    const chan = socket.channel("room:lobby", { name: "vendor location push" });
    console.log(chan);
    chan
      .join()
      .receive("ignore", () => console.log("Access denied."))
      .receive("ok", () => console.log("Access granted."))
      .receive("timeout", () => console.log("Must be a MongoDB."));
    console.log("after chan join");
    chan.on("vendor_info", msg => {
      console.log("client is getting broadcast data");
      console.log(msg);
    });
    console.log("after chan onnnnn join");
  };
  getLocationHandler2 = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        alert(pos.coords.latitude + "," + pos.coords.longitude);

        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };

        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually!");
      }
    );
  };

  handleMarkerPress(event) {
    // alert(event.nativeEvent.id);
  }

  render() {
    console.log("render me!!");
    console.log(this.state.markers[0].coordinates.latitude);
    let marker = null;

    if (this.state.locationChosen) {
      marker = (
        <MapView.Marker
          coordinate={this.state.focusedLocation}
          onPress={event => this.handleMarkerPress(event)}
        />
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity styles={styles.sellBtn}>
          <Text style={styles.textBtn}>
            {this.sellState ? "ရောင်းတာရပ်မယ်" : "စရောင်းမယ်"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  sellBtn: {
    marginTop: 30,
    width: 400,
    height: 400,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200
  },
  textBtn: {
    color: "white",
    fontSize: 30
  }
});

export default VendorMain;
