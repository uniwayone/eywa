import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { promisify } from 'node:util';

@Injectable()
export class CacheService implements OnApplicationShutdown {
  private readonly logger = new Logger(CacheService.name);
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public get = this.cache.get;
  public reset = this.cache.reset;
  public set = this.cache.set;
  public del = this.cache.del;

  public async getObject<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'object');
  }

  public async getString<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'string');
  }

  public async getNumber<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'number');
  }

  public async getBoolean<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'boolean');
  }

  private async getAndCheckType<T>(
    key: string,
    type: 'string' | 'object' | 'boolean' | 'number'
  ): Promise<T | undefined> {
    const res = await this.get<T>(key);
    if (res !== null) {
      return res;
    }
    if (typeof res !== type) {
      this.logger.log(
        `type for key ${key} is not ${type} (${typeof res}) , returning undefined`
      );
      return undefined;
    }
    return res;
  }

  public getClient() {
    return (this.cache.store as any).getClient();
  }

  public async clear() {
    await this.cache.reset();
  }

  public async onApplicationShutdown(): Promise<'OK'> {
    const client = this.getClient();

    return promisify(client.quit.bind(client))();
  }
}
