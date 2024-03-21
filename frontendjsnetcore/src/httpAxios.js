import axios from "axios";
import { urlAPI } from "./config.js";

const httpAxios = axios.create({
    baseURL: urlAPI,
    timeout: 20000,
    header: {"X-Customer_Header":'foobar'}
})
export default httpAxios;