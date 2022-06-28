import axios from "axios";

export const axiosInstance =axios.create({
    baseURL:"https://mappining.herokuapp.com/api/"
})
