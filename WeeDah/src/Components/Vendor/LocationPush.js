import { Socket } from "../../WebSocket/PheonixSocket";
import vendor from "../../globalData";

const TIMEOUT = 100000;
const URL = vendor.socketUrl;
const LOBBY = "room:lobby";

let locationPush = (lat, lng) => {
  console.log(URL);
  const socket = new Socket(URL);

  socket.onOpen(event => console.log("Connected."));
  socket.onError(event => console.log("Cannot connect."));
  socket.onClose(event => console.log("Goodbye."));
  socket.connect();

  const chan = socket.channel("room:lobby", { name: "vendor location push" });

  chan
    .join()
    .receive("ignore", () => console.log("Access denied."))
    .receive("ok", () => console.log("Access granted."))
    .receive("timeout", () => console.log("Must be a MongoDB."));

  const send = message => {
    chan
      .push("vendor_info", {
        vendor_id: vendor.vendor_id,
        lat: lat,
        lng: lng,
        status: "active",
        category: vendor.category
      })
      .receive("ok", msg => console.log("sent"))
      .receive("error", reasons => console.log("Error", reasons))
      .receive("timeout", () => console.log("slow much?"));
  };
  send();
};

export default locationPush;
