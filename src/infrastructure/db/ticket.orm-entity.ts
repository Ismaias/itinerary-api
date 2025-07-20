import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItineraryOrmEntity } from './itinerary.orm-entity';
import { TicketType } from 'src/domain/entities/ticket-type.enum';

@Entity('tickets')
export class TicketOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  type: TicketType;

  @Column('jsonb')
  details?: Record<string, any>;

  @ManyToOne(() => ItineraryOrmEntity, (itinerary) => itinerary.tickets, {
    onDelete: 'CASCADE',
  })
  itinerary: ItineraryOrmEntity;
}
