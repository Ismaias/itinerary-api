import { Injectable, Inject } from '@nestjs/common';
import { Itinerary } from '../../domain/entities/itinerary.entity';
import { Ticket } from '../../domain/entities/ticket.entity';
import { ItineraryDomainService } from '../../domain/services/itinerary-domain.service';
import { ItineraryRepositoryPort } from '../ports/itinerary-repository.port';
import { ITINERARY_REPOSITORY } from 'src/infrastructure/constants/intinerary.token';

@Injectable()
export class CreateItineraryUseCase {
  constructor(
    @Inject(ITINERARY_REPOSITORY)
    private readonly repo: ItineraryRepositoryPort,
    private readonly domainService: ItineraryDomainService,
  ) {}

  async execute(tickets: Ticket[]): Promise<Itinerary> {
    this.domainService.validateItinerary(tickets);
    const itinerary = new Itinerary({ tickets });
    return this.repo.save(itinerary);
  }
}
