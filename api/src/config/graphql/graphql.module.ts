import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';

const graphQLLogger = new Logger('GraphQLModule');

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseConfig: GqlModuleOptions = {
          path: '/api/graphql',
          debug: false,
          autoSchemaFile: true,
          formatError: (error) => {
            graphQLLogger.error('error', error);
            return error;
          },
          cors: {
            origin: [configService.get<string>('SERVER_URL_ORIGIN')],
            credentials: true,
          },
        };
        if (configService.get<string>('NODE_ENV') !== 'production') {
          baseConfig.cors.origin.push('https://studio.apollographql.com');
          return {
            ...baseConfig,
            playground: true,
            introspection: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          };
        }
        return baseConfig;
      },
    }),
  ],
})
export class GraphqlModule {}
