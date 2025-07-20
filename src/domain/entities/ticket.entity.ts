import { TicketType } from './ticket-type.enum';

/**
 * Domain entity representing a travel ticket.
 */
export class Ticket {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly type: TicketType,
    public readonly details?: Record<string, any>,
  ) {}
}
