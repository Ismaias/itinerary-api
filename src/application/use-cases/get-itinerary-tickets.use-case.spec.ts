import { GetItineraryTicketsUseCase } from './get-itinerary-tickets.use-case';
import { Ticket } from '../../domain/entities/ticket.entity';
import { TicketType } from '../../domain/entities/ticket-type.enum';
import { ItineraryNotFoundException } from '../../domain/exceptions/itinerary-not-found.exception';

describe('GetItineraryTicketsUseCase', () => {
  const repo = { findById: jest.fn() };
  const useCase = new GetItineraryTicketsUseCase(repo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return tickets for a valid itinerary', async () => {
    const tickets = [new Ticket('A', 'B', TicketType.BUS)];
    repo.findById.mockResolvedValue({ tickets });
    const result = await useCase.execute('1');
    expect(result).toBe(tickets);
  });

  it('should throw ItineraryNotFoundException if not found', async () => {
    repo.findById.mockResolvedValue(undefined);
    await expect(useCase.execute('1')).rejects.toThrow(
      ItineraryNotFoundException,
    );
  });
});
