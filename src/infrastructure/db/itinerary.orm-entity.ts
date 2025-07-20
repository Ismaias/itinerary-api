import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TicketOrmEntity } from './ticket.orm-entity';

@Entity('itineraries')
export class ItineraryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TicketOrmEntity, (ticket) => ticket.itinerary, {
    cascade: true,
    eager: true,
  })
  tickets: TicketOrmEntity[];
}
