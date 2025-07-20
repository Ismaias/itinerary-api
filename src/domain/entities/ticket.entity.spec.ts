import { Ticket } from './ticket.entity';
import { TicketType } from './ticket-type.enum';

describe('Ticket', () => {
  it('should create a ticket with all properties', () => {
    const details = { seat: '1A', trainNumber: 'T1' };
    const ticket = new Ticket('A', 'B', TicketType.TRAIN, details);
    expect(ticket.from).toBe('A');
    expect(ticket.to).toBe('B');
    expect(ticket.type).toBe(TicketType.TRAIN);
    expect(ticket.details).toEqual(details);
  });

  it('should create a ticket without details', () => {
    const ticket = new Ticket('A', 'B', TicketType.BUS);
    expect(ticket.details).toBeUndefined();
  });
});
