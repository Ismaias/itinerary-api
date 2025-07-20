import { Itinerary } from './itinerary.entity';
import { Ticket } from './ticket.entity';
import { TicketType } from './ticket-type.enum';

describe('Itinerary', () => {
  const ticketsUnordered: Ticket[] = [
    new Ticket('B', 'C', TicketType.BUS, { seat: '12A' }),
    new Ticket('A', 'B', TicketType.TRAIN, {
      trainNumber: 'T1',
      platform: '1',
      seat: '1A',
    }),
    new Ticket('C', 'D', TicketType.FLIGHT, {
      flightNumber: 'F1',
      gate: 'G1',
      seat: '2B',
    }),
  ];

  it('should sort tickets in the correct order', () => {
    const sorted = Itinerary.sortTickets(ticketsUnordered);
    expect(sorted.map((t) => t.from)).toEqual(['A', 'B', 'C']);
    expect(sorted.map((t) => t.to)).toEqual(['B', 'C', 'D']);
  });

  it('should return an empty array when sorting empty tickets', () => {
    expect(Itinerary.sortTickets([])).toEqual([]);
  });

  it('should handle a single ticket', () => {
    const single = [new Ticket('X', 'Y', TicketType.BUS, { seat: '1' })];
    expect(Itinerary.sortTickets(single)).toEqual(single);
  });

  it('instance sortTickets should sort its own tickets', () => {
    const itinerary = new Itinerary({ tickets: ticketsUnordered });
    expect(itinerary.sortTickets().map((t) => t.from)).toEqual(['A', 'B', 'C']);
  });

  it('should format a sorted itinerary correctly', () => {
    const sorted = Itinerary.sortTickets(ticketsUnordered);
    const lines = Itinerary.format(sorted);
    expect(lines[0]).toBe('Start.');
    expect(lines[1]).toContain('Board train');
    expect(lines[2]).toContain('Board the bus');
    expect(lines[3]).toContain('board the flight');
    expect(lines[lines.length - 1]).toBe('Last destination reached.');
  });

  it('instance format should format its own sorted tickets', () => {
    const itinerary = new Itinerary({ tickets: ticketsUnordered });
    const lines = itinerary.format();
    expect(lines[0]).toBe('Start.');
    expect(lines[lines.length - 1]).toBe('Last destination reached.');
  });

  it('should handle empty tickets in format', () => {
    expect(Itinerary.format([])).toEqual(['No itinerary available.']);
  });
});
