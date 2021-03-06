import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

const graphQLLogger = new Logger('GraphQLModule');

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseConfig: ApolloDriverConfig = {
          path: '/api/graphql',
          debug: false,
          autoSchemaFile: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
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
