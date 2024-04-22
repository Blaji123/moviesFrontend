import axios from "axios";

export default axios.create({
  baseURL: "https://movies-backend.azurewebsites.net",
});
