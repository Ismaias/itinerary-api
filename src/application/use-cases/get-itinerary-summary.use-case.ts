import { Injectable, Inject } from '@nestjs/common';
import { ItineraryRepositoryPort } from '../ports/itinerary-repository.port';
import { ItineraryNotFoundException } from 'src/domain/exceptions/itinerary-not-found.exception';
import { ITINERARY_REPOSITORY } from 'src/infrastructure/constants/intinerary.token';

/**
 * Use case for returning the sorted and formatted itinerary for a given id.
 */
@Injectable()
export class GetItinerarySummaryUseCase {
  constructor(
    @Inject(ITINERARY_REPOSITORY)
    private readonly repo: ItineraryRepositoryPort,
  ) {}

  async execute(itineraryId: string): Promise<string[]> {
    const itinerary = await this.repo.findById(itineraryId);
    if (!itinerary) {
      throw new ItineraryNotFoundException(itineraryId);
    }
    return itinerary.format();
  }
}
