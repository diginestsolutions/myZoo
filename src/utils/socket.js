import { io } from "socket.io-client";
import { API_URL } from "../config/Constants";

const socket = io.connect(API_URL);

export default socket;