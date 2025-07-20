import { ItineraryDomainService } from './itinerary-domain.service';
import { Ticket } from '../entities/ticket.entity';
import { TicketType } from '../entities/ticket-type.enum';
import { InvalidItineraryException } from '../exceptions/invalid-itinerary.exception';

describe('ItineraryDomainService', () => {
  const service = new ItineraryDomainService();

  it('should throw if tickets is empty', () => {
    expect(() => service.validateItinerary([])).toThrow(
      InvalidItineraryException,
    );
  });

  it('should not throw for a valid single ticket', () => {
    const tickets = [new Ticket('A', 'B', TicketType.BUS)];
    expect(() => service.validateItinerary(tickets)).not.toThrow();
  });
});
