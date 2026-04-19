export interface ICache {
  get<T>(key: string): Promise<T | null>;
  set(key: string, data: any, ttlSeconds?: number): Promise<void>;
}
