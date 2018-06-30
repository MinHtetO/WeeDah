import { AppRegistry } from "react-native";
import Login from "./src/Components/Login";
import { Navigation } from "react-native-navigation";
import VendorMain from "./src/Components/Vendor/VendorMain";
import UserMap from "./src/Components/User/Map";
import UserSearch from "./src/Components/User/Search";
import Drawer from "./src/Components/Drawer";

Navigation.registerComponent("Login", () => Login);
Navigation.registerComponent("VendorMain", () => VendorMain);
Navigation.registerComponent("UserMap", () => UserMap);
Navigation.registerComponent("UserSearch", () => UserSearch);
Navigation.registerComponent("Drawer", () => Drawer);

Navigation.startSingleScreenApp({
  screen: {
    screen: "Login",
    title: "Welcome"
  }
});

// AppRegistry.registerComponent("WeeDah", () => Login);
