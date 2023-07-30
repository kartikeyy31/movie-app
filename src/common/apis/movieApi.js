import axios from "axios";

export default axios.create({
    baseURL: process.env.local.REACT_APP_BASEURL,
});