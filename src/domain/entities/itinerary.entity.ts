import { Ticket } from './ticket.entity';

export class Itinerary {
  public readonly id?: string;
  public readonly tickets: Ticket[];

  constructor(params: { id?: string; tickets: Ticket[] }) {
    this.id = params.id;
    this.tickets = params.tickets;
  }

  static sortTickets(tickets: Ticket[]): Ticket[] {
    if (!tickets || tickets.length === 0) return [];
    const fromMap = new Map<string, Ticket>();
    const toSet = new Set<string>();
    for (const ticket of tickets) {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    }
    // Find the starting point: a 'from' that is not any 'to'.
    let start: string | undefined = undefined;
    for (const ticket of tickets) {
      // This is the unique starting location of the itinerary.
      if (!toSet.has(ticket.from)) {
        start = ticket.from;
        break;
      }
    }
    // Fallback: if not found, use the first ticket's 'from'.
    if (!start) start = tickets[0].from;
    const ordered: Ticket[] = [];
    let current = start;
    // Walk the chain from start to end, collecting tickets in order.
    while (fromMap.has(current)) {
      const ticket = fromMap.get(current)!;
      ordered.push(ticket);
      current = ticket.to;
    }
    return ordered;
  }

  sortTickets(): Ticket[] {
    return Itinerary.sortTickets(this.tickets);
  }

  static format(tickets: Ticket[]): string[] {
    const lines: string[] = [];
    if (!tickets || tickets.length === 0) {
      lines.push('No itinerary available.');
      return lines;
    }
    lines.push('Start.');
    tickets.forEach((ticket, idx) => {
      let line = '';
      // Format each ticket based on its type and available details.
      switch (ticket.type) {
        case 'train':
          line = `Board train ${ticket.details?.trainNumber || ''}${ticket.details?.trainNumber ? ',' : ''} Platform ${ticket.details?.platform || ''} from ${ticket.from} to ${ticket.to}.${ticket.details?.seat ? ' Seat number ' + ticket.details.seat + '.' : ''}`;
          break;
        case 'tram':
          line = `Board the Tram ${ticket.details?.tramNumber || ''} from ${ticket.from} to ${ticket.to}.`;
          break;
        case 'bus':
          line = `Board the bus from ${ticket.from} to ${ticket.to}.${ticket.details?.seat ? ' Seat number ' + ticket.details.seat + '.' : ' No seat assignment.'}`;
          break;
        case 'airport bus':
          line = `Board the airport bus from ${ticket.from} to ${ticket.to}.${ticket.details?.seat ? ' Seat number ' + ticket.details.seat + '.' : ' No seat assignment.'}`;
          break;
        case 'flight':
          line = `From ${ticket.from}, board the flight ${ticket.details?.flightNumber || ''} to ${ticket.to} from gate ${ticket.details?.gate || ''}${ticket.details?.seat ? ', seat ' + ticket.details.seat : ''}.${ticket.details?.luggage ? ' ' + ticket.details.luggage : ''}`;
          break;
        default:
          line = `Go from ${ticket.from} to ${ticket.to} by ${ticket.type}.`;
      }
      lines.push(`${idx + 1}. ${line}`);
    });
    lines.push('Last destination reached.');
    return lines;
  }

  format(): string[] {
    return Itinerary.format(this.sortTickets());
  }
}
