import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      Logger.error(`Error getting key ${key} from Redis`, error);
      throw error;
    }
  }

  async set(
    key: string,
    value: any,
    ttlInSeconds: number = 3600,
  ): Promise<void> {
    try {
      const ttlInMilliseconds = ttlInSeconds * 1000;
      await this.cacheManager.set(key, value, ttlInMilliseconds);
    } catch (error) {
      Logger.error(`Error setting key ${key} to Redis`, error);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      Logger.error(`Error deleting key ${key} from Redis`, error);
      throw error;
    }
  }

  async delPatternSpecific(prefix: string): Promise<void> {
    try {
      const keys = await this.cacheManager.store.keys(`${prefix}*`);
      const roleKeys = keys.filter((key) => key.startsWith(prefix));
      await this.delMultiple(roleKeys);
    } catch (error) {
      Logger.error(
        `Error deleting keys with prefix ${prefix} from Redis`,
        error,
      );
      throw error;
    }
  }

  async delMultiple(keys: string[]): Promise<void> {
    try {
      await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    } catch (error) {
      Logger.error(`Error deleting multiple keys from Redis`, error);
      throw error;
    }
  }

  async reset(): Promise<void> {
    try {
      await this.cacheManager.reset();
    } catch (error) {
      Logger.error('Error resetting Redis', error);
      throw error;
    }
  }

  async mget(keys: string[]): Promise<any[]> {
    try {
      return await Promise.all(keys.map((key) => this.get(key)));
    } catch (error) {
      Logger.error('Error getting multiple keys from Redis', error);
      throw error;
    }
  }
}
