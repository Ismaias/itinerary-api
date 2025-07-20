import { GetItinerarySummaryUseCase } from './get-itinerary-summary.use-case';
import { Ticket } from '../../domain/entities/ticket.entity';
import { TicketType } from '../../domain/entities/ticket-type.enum';
import { ItineraryNotFoundException } from '../../domain/exceptions/itinerary-not-found.exception';

describe('GetItinerarySummaryUseCase', () => {
  const repo = { findById: jest.fn() };
  const useCase = new GetItinerarySummaryUseCase(repo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted summary for a valid itinerary', async () => {
    const tickets = [new Ticket('A', 'B', TicketType.BUS)];
    repo.findById.mockResolvedValue({
      tickets,
      format: () => [
        'Start.',
        '1. Board the bus from A to B. No seat assignment.',
        'Last destination reached.',
      ],
    });
    const result = await useCase.execute('1');
    expect(result).toEqual([
      'Start.',
      '1. Board the bus from A to B. No seat assignment.',
      'Last destination reached.',
    ]);
  });

  it('should throw ItineraryNotFoundException if not found', async () => {
    repo.findById.mockResolvedValue(undefined);
    await expect(useCase.execute('1')).rejects.toThrow(
      ItineraryNotFoundException,
    );
  });
});
