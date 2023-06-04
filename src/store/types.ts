export interface Store {
  setup: () => Promise<void>;
  getItem: <T = any>(key: string, defaultValue?: T) => Promise<T>;
  setItem: <T = any>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  removeItems: (keyPrefix: string) => Promise<void>;
  subscribe: (key: string, callback: (value: any) => void) => () => void;
}
