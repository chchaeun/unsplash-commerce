import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID vcrIAOE6Kal7n_VTcLCfImgPh3-UAtdU-n7RaTCAXkg`,
  },
});
