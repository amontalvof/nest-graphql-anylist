import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ItemsModule } from './items/items.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            // debug: false,
            playground: false,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        ItemsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
