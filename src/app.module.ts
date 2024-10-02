import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatController } from './cats/cat.controller';
import { CatService } from './cats/cat.service';
import { LoggerMiddleware } from './cats/middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CatController],
  providers: [CatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
