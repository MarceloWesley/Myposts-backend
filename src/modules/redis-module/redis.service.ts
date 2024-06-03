import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor(private readonly configService: ConfigService) {
    const redisClient = new Redis({
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: this.configService.getOrThrow('REDIS_PORT'),
      tls: {
        host: this.configService.getOrThrow('REDIS_HOST'),
        port: this.configService.getOrThrow('REDIS_PORT'),
      },
      username: 'default',
      password: this.configService.getOrThrow('REDIS_PASSWORD'),
    });
    this.redisClient = redisClient;
  }

  save(key: string, value: Record<string, unknown>, expires?: number) {
    return this.redisClient.set(key, JSON.stringify(value), 'EX', expires);
  }

  get(key: string) {
    return this.redisClient.get(key);
  }

  async delete(key: string) {
    const deleted = await this.redisClient.del(key);
    return deleted === 1; // Return true if the key was deleted, false otherwise
  }
}
