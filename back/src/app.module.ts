import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { BoxOfficeController } from './controllers/boxoffice.controller';
import { BoxOfficeService } from './services/boxoffice.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 43200,
      }),
    }),
    HttpModule
  ],
  controllers: [AppController, BoxOfficeController],
  providers: [AppService, BoxOfficeService],
})
export class AppModule { 

}
