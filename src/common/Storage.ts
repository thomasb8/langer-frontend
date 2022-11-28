export default class Storage {
  set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: StorageKey) {
    return localStorage.getItem(key);
  }

  remove(key: StorageKey) {
    localStorage.removeItem(key);
  }
}

export enum StorageKey {
  LOGIN_ACCESS_TOKEN = 'login-access-token'
}
