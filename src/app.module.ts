import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatModule } from './cats/cat.module';
import { LoggerMiddleware } from './cats/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'root',
      entities: [Cat],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    CatModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
