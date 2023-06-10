import { DynamicModule, CacheModule as NestCacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { CacheService } from '../services';

export class CacheModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [
        NestCacheModule.register({
          store: redisStore,
          port: process.env.REDIS_PORT,
          host: process.env.REDIS_HOST,
        }),
      ],
      module: CacheModule,
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
