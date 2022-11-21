import type { AxiosInstance } from "axios";
import User from "@/user/User";

export class AuthService {
  constructor(private readonly axios: AxiosInstance) {}

  async register(email: string, password: string) {
    const res = await this.axios.post('/auth/register', { email, password });
    return User.fromDto(res.data);
  }

  async login(email: string, password: string) {
    const res = await this.axios.post('/auth/login', { email, password });
    if (res.data.accessToken) {
      this.axios.defaults.headers.common = { 'Authorization': `Bearer ${res.data.accessToken} `};
    }
  }
}
