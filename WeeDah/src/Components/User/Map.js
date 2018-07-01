import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, MarkerAnimated } from "react-native-maps";
import { Socket } from "../../WebSocket/PheonixSocket";
import vendor from "../../globalData";
import { theme } from "../../Style/theme";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.foundIndex = null;
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

  state = {
    focusedLocation: {
      latitude: 16.817169,
      longitude: 96.131997,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    locationChosen: false,
    markers: []
  };

  // state = {
  //   focusedLocation: {
  //     latitude: 37.7900352,
  //     longitude: -122.4013726,
  //     latitudeDelta: 0.0122,
  //     longitudeDelta:
  //       (Dimensions.get("window").width / Dimensions.get("window").height) *
  //       0.0122
  //   }
  // };

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

  componentDidMount() {
    this.getLocationHandlerFake();

    const TIMEOUT = 100000;
    const URL = vendor.socketUrl;

    const LOBBY = "room:lobby";
    const socket = new Socket(URL);
    socket.onOpen(event => console.log("Connected."));
    socket.onError(event => console.log("Cannot connect."));
    socket.onClose(event => console.log("Goodbye."));
    socket.connect();
    const chan = socket.channel("room:lobby", {
      name: "vendor location push"
    });
    chan
      .join()
      .receive("ignore", () => console.log("Access denied."))
      .receive("ok", () => console.log("Access granted."))
      .receive("timeout", () => console.log("Must be a MongoDB."));

    chan.on("vendor_info", msg => {
      marker = {
        lat: msg.lat,
        lng: msg.lng,
        vendor_id: msg.vendor_id,
        category: msg.category
      };
      console.log("search result");
      console.log(this.search(msg.vendor_id).length);
      if (this.search(msg.vendor_id).length > 0) {
        marker = {
          lat: msg.lat,
          lng: msg.lng,
          vendor_id: msg.vendor_id,
          category: msg.category
        };
        let newMarkers = this.state.markers;
        newMarkers[this.foundIndex] = marker;
        this.setState({
          markers: newMarkers
        });
      } else {
        console.log("new marker");

        newMarkers = this.state.markers.concat(marker);
        console.log("new markers");
        console.log(newMarkers);
        this.setState(prevState => {
          return {
            markers: newMarkers
          };
        });
      }
      console.log("marker state");
      console.log(this.state.markers);
    });
  }

  search = id => {
    return this.state.markers.filter((marker, i) => {
      if (marker.vendor_id === id) {
        this.foundIndex = i;
        return true;
      }
    });
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
    //alert("latitude "+ this.state.focusedLocation.latitude+" longitude "+ this.state.focusedLocation.longitude)
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
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

  getLocationHandlerFake = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: 16.817169,
              longitude: 96.131997
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
    Navigation.showLightBox({
      screen: "Detail", // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(206, 44, 44,0.4)", // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }

  // renderList = () => {
  //   this.state.markers.map(marker => {
  //     <MapView.Marker
  //       key={Math.random()}
  //       onPress={event => this.handleMarkerPress(event)}
  //       coordinate={{ latitude: marker.lat, longitude: marker.lng }}
  //       title={marker.title}
  //       pinColor={"#ff00000"}
  //     />;
  //   });
  // };

  renderList = () =>
    this.state.markers.map(marker => (
      <MapView.Marker
        key={Math.random()}
        onPress={event => this.handleMarkerPress(event)}
        coordinate={{ latitude: marker.lat, longitude: marker.lng }}
        title={marker.title}
        pinColor={"#ff00000"}
      >
        <View style={styles.circle}>
          <Text style={styles.pinText}>အသုတ်စုံ</Text>
        </View>
      </MapView.Marker>
    ));

  render() {
    console.log("START render");
    console.log(this.renderList());
    console.log("END render");
    let marker = null;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={event => this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {this.renderList()}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.GG} />
        </View>
      </View>
    );
  }
  GG = () => {
    Navigation.showLightBox({
      screen: "Detail", // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(206, 44, 44,0.4)", // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: "90%"
  },
  button: {
    margin: 8
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  circle: {
    padding: 4,
    width: "auto",
    height: "auto",
    backgroundColor: theme.mainColor,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  pinText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12
  }
});
