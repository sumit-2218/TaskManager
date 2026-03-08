import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const getTasksByUser = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateTask = (id, task) => {
  return axios.put(`http://localhost:8080/api/tasks/${id}`, task);
};