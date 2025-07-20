import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryOrmEntity } from '../db/itinerary.orm-entity';
import { TicketOrmEntity } from '../db/ticket.orm-entity';
import { ItineraryRepository } from '../db/itinerary.repository';
import { CreateItineraryUseCase } from '../../application/use-cases/create-itinerary.use-case';
import { ItineraryDomainService } from '../../domain/services/itinerary-domain.service';
import { ItineraryController } from '../controllers/itinerary.controller';
import { ITINERARY_REPOSITORY } from '../constants/intinerary.token';
import { GetItineraryTicketsUseCase } from 'src/application/use-cases/get-itinerary-tickets.use-case';
import { GetItinerarySummaryUseCase } from 'src/application/use-cases/get-itinerary-summary.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ItineraryOrmEntity, TicketOrmEntity])],
  controllers: [ItineraryController],
  providers: [
    ItineraryRepository,
    {
      provide: ITINERARY_REPOSITORY,
      useClass: ItineraryRepository,
    },
    ItineraryDomainService,
    CreateItineraryUseCase,
    GetItineraryTicketsUseCase,
    GetItinerarySummaryUseCase,
  ],
  exports: [
    CreateItineraryUseCase,
    ITINERARY_REPOSITORY,
    ItineraryDomainService,
    ItineraryRepository,
  ],
})
export class ItineraryModule {}
