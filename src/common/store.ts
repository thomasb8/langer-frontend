import { reactive } from 'vue'
import type User from "@/user/User";

export const store = reactive<UserState>({
  user: null,
  setUser(user: User | null) {
    this.user = user;
  },
  isUserLoggedIn() {
    return !!this.user;
  }
})

interface UserState {
  user: User | null,
  setUser: (user: User | null) => void,
  isUserLoggedIn(): boolean
}
