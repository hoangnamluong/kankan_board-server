import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DomainModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
