import type { AxiosInstance } from "axios";
import User from "@/user/User";
import Storage, { StorageKey } from "@/common/Storage";

export class AuthService {
  constructor(private readonly axios: AxiosInstance, private readonly storage: Storage) {}

  async register(email: string, password: string): Promise<User> {
    const res = await this.axios.post('/auth/register', { email, password });
    return User.fromDto(res.data);
  }

  async login(email: string, password: string): Promise<User> {
    const res = await this.axios.post('/auth/login', { email, password });
    if (res.data.accessToken) {
      this.setUserHeader(res.data.accessToken);
      this.storage.set(StorageKey.LOGIN_ACCESS_TOKEN, res.data.accessToken);
    }
    return res.data.user;
  }

  async getProfile(token: string): Promise<User | null> {
    const res = await this.axios.get('/auth/profile', { headers: { 'Authorization': `Bearer ${token}`}});
    if (res.data) {
      this.setUserHeader(token);
    }
    return User.fromDto(res.data);
  }

  async logout() {
    this.axios.defaults.headers.common = {};
    this.storage.remove(StorageKey.LOGIN_ACCESS_TOKEN);
  }

  setUserHeader(accessToken: string) {
    this.axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken} `};
  }
}
