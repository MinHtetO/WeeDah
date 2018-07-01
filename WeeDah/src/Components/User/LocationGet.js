import { Socket } from "../../WebSocket/PheonixSocket";
import data from "../../globalData";

let locationGet = () => {
  const TIMEOUT = 100000;
  const URL = vendor.sockerUrl;
  const LOBBY = "room:lobby";
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

  chan.on("vendor_info", msg => {
    console.log("client is getting broadcast data");
    console.log(msg);
  });
};
