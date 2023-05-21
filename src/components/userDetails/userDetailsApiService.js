import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

async function getUsersDetails() {
  return axios.get(`${apiUrl}/users`);
}

export default { getUsersDetails };
