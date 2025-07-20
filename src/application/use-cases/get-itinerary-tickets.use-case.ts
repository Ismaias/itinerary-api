import { Injectable, Inject } from '@nestjs/common';
import { ItineraryRepositoryPort } from '../ports/itinerary-repository.port';
import { Ticket } from 'src/domain/entities/ticket.entity';
import { ITINERARY_REPOSITORY } from 'src/infrastructure/constants/intinerary.token';
import { ItineraryNotFoundException } from 'src/domain/exceptions/itinerary-not-found.exception';

/**
 * Use case for listing the tickets of an itinerary by its id.
 */
@Injectable()
export class GetItineraryTicketsUseCase {
  constructor(
    @Inject(ITINERARY_REPOSITORY)
    private readonly repo: ItineraryRepositoryPort,
  ) {}

  async execute(itineraryId: string): Promise<Ticket[]> {
    const itinerary = await this.repo.findById(itineraryId);
    if (!itinerary) {
      throw new ItineraryNotFoundException(itineraryId);
    }
    return itinerary.tickets;
  }
}
