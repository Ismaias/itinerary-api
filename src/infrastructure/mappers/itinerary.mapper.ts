import { Itinerary } from '../../domain/entities/itinerary.entity';
import { Ticket } from '../../domain/entities/ticket.entity';
import { ItineraryOrmEntity } from '../db/itinerary.orm-entity';
import { TicketOrmEntity } from '../db/ticket.orm-entity';

export class ItineraryMapper {
  static ormToDomain(orm: ItineraryOrmEntity): Itinerary {
    return new Itinerary({
      id: orm.id,
      tickets: orm.tickets.map(
        (t) => new Ticket(t.from, t.to, t.type, t.details),
      ),
    });
  }

  static domainToOrm(domain: Itinerary): ItineraryOrmEntity {
    const orm = new ItineraryOrmEntity();
    if (domain.id) {
      orm.id = domain.id;
    }
    orm.tickets = domain.tickets.map((ticket) => {
      const t = new TicketOrmEntity();
      t.from = ticket.from;
      t.to = ticket.to;
      t.type = ticket.type;
      t.details = ticket.details;
      return t;
    });
    return orm;
  }
}
