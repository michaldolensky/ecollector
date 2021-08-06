import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './images/images.module';
import { ItemsModule } from './items/items.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';

const graphQLLogger = new Logger('GraphQLModule');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets', 'client'),
      exclude: ['/api*', '/uploads'],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      path: '/api/graphql',
      debug: false,
      formatError: (error) => {
        graphQLLogger.error('error', error);
        return error;
      },
      //TODO
      cors: {
        origin: ['http://localhost:8080', 'https://studio.apollographql.com'],
        credentials: true,
      },
    }),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    UsersModule,
    SitesModule,
    CategoriesModule,
    ItemsModule,
    ImagesModule,
  ],
})
export class AppModule {}
