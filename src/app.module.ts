import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryModule } from './infrastructure/modules/itinerary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'keycloak',
      password: 'password',
      database: 'lost_in_europe',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ItineraryModule,
  ],
})
export class AppModule {}
