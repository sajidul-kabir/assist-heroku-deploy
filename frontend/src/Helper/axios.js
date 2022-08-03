import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const instance = axios.create({
  baseURL: "",
});
if (cookies.get("assistc")) {
  instance.defaults.headers["Authorization"] = `Bearer ${cookies.get(
    "assistc"
  )}`;
}

export default instance;
