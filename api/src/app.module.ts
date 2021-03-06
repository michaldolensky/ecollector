import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './config/database/database.module';
import { GraphqlModule } from './config/graphql/graphql.module';
import { ImagesModule } from './images/images.module';
import { ItemsModule } from './items/items.module';
import { ParametersModule } from './parameters/parameters.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'assets', 'client'),
    //   exclude: ['/api*', '/uploads'],
    // }),
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
        SERVER_URL_ORIGIN: Joi.string().required(),
        NODE_ENV: Joi.string().default('production'),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_S3_ENDPOINT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    UsersModule,
    SitesModule,
    CategoriesModule,
    ItemsModule,
    ImagesModule,
    ParametersModule,
    CommonModule,
    GraphqlModule,
    FilesModule,
  ],
})
export class AppModule {}
