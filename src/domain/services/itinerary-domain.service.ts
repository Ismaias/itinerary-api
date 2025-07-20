import { Injectable } from '@nestjs/common';
import { Ticket } from '../entities/ticket.entity';
import { InvalidItineraryException } from '../exceptions/invalid-itinerary.exception';

@Injectable()
export class ItineraryDomainService {
  validateItinerary(tickets: Ticket[]): void {
    if (!tickets || tickets.length === 0) {
      throw new InvalidItineraryException('At least one ticket is required.');
    }
  }
}
