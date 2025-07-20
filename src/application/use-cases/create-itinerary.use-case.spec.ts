import { CreateItineraryUseCase } from './create-itinerary.use-case';
import { Ticket } from '../../domain/entities/ticket.entity';
import { TicketType } from '../../domain/entities/ticket-type.enum';
import { InvalidItineraryException } from '../../domain/exceptions/invalid-itinerary.exception';

describe('CreateItineraryUseCase', () => {
  const repo = { save: jest.fn() };
  const domainService = { validateItinerary: jest.fn() };
  const useCase = new CreateItineraryUseCase(repo as any, domainService as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an itinerary when valid', async () => {
    const tickets = [new Ticket('A', 'B', TicketType.BUS)];
    repo.save.mockResolvedValue({ id: '1', tickets });
    domainService.validateItinerary.mockImplementation(() => {});
    const result = await useCase.execute(tickets);
    expect(result.id).toBe('1');
    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({ tickets }),
    );
  });

  it('should throw InvalidItineraryException on validation error', async () => {
    const tickets = [];
    domainService.validateItinerary.mockImplementation(() => {
      throw new InvalidItineraryException('error');
    });
    await expect(useCase.execute(tickets)).rejects.toThrow(
      InvalidItineraryException,
    );
  });
});
