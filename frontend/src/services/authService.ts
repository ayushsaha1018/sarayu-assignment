import { AuthForm } from "@/lib/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axios_ = axios.create({
  baseURL: API_URL,
});

class AuthService {
  static async loginUser(userData: AuthForm) {
    const response = await axios_.post(`/user/login`, userData);
    return response.data;
  }

  static async registerUser(userData: AuthForm) {
    const response = await axios_.post(`/user/register`, userData);
    return response.data;
  }
}

export default AuthService;
