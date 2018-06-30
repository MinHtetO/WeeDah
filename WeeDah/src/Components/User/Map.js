import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class App extends Component {
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
    ]
  };

  changeCoor = () => {
    this.setState(prevState => {
      return {
        markers: prevState.markers.map(marker => {
          return {
            title: marker.title,
            coordinates: {
              latitude: marker.coordinates.latitude + 0.00000009,
              longitude: marker.coordinates.longitude + 0.0000009
            }
          };
        })
      };
    });
  };

  componentDidMount() {
    //setInterval(() => this.changeCoor(), 10);
  }

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
    console.log(navigator.geolocation.getCurrentPosition);

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

    let onSuccess = () => {
      console.log("success");
    };

    let onError = () => {
      console.log("error");
    };
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
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={Math.random()}
              onPress={event => this.handleMarkerPress(event)}
              coordinate={marker.coordinates}
              title={marker.title}
              pinColor={"#ff00000"}
            />
          ))}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
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
  }
});

export default App;
