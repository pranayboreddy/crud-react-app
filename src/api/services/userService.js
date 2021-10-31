import httpClient from "../httpClient";
const api_endpoint = "/api/users";

const userService = {
  getUser: () => httpClient.get(api_endpoint),
  createUser: (data) => httpClient.post(api_endpoint, data),
  updateUser: (data) => httpClient.put(`${api_endpoint}/${data.id}`),
  deleteUser: (id) => httpClient.delete(`${api_endpoint}/${id}`),
};

export default userService;
