import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from 'src/common/directives/upper-case.directive';
import { BoardModule } from './board/board.module';
import { ColumnsModule } from './columns/columns.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import typeORMConfig from 'src/config/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => typeORMConfig.options,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: true,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      sortSchema: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        ttl: 30 * 1000,
        stores: [createKeyv(configService.get('REDIS_SERVER'))],
      }),
    }),
    BoardModule,
    ColumnsModule,
    TaskModule,
    UsersModule,
  ],
})
export class DomainModule {}
