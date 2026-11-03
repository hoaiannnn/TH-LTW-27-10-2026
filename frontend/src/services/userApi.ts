import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5062/api",
});

export interface User {
  id: number;
  fullName: string;
  email: string;
  age: number;
}

export const getUsers = () => {
  return API.get<User[]>("/users");
};

export const getUser = (id: number) => {
  return API.get<User>(`/users/${id}`);
};

export const createUser = (user: {
  fullName: string;
  email: string;
  age: number;
}) => {
  return API.post<User>("/users", user);
};

export const updateUser = (
  id: number,
  user: {
    fullName: string;
    email: string;
    age: number;
  }
) => {
  return API.put<User>(`/users/${id}`, user);
};

export const deleteUser = (id: number) => {
  return API.delete(`/users/${id}`);
};

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  age: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export const register = (data: RegisterRequest) => {
  return API.post<AuthResponse>("/users/register", data);
};

export const login = (data: LoginRequest) => {
  return API.post<AuthResponse>("/users/login", data);
};
