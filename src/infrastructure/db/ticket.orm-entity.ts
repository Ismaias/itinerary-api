import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItineraryOrmEntity } from './itinerary.orm-entity';

@Entity('tickets')
export class TicketOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  type: string;

  @Column('jsonb')
  details?: Record<string, any>;

  @ManyToOne(() => ItineraryOrmEntity, (itinerary) => itinerary.tickets, {
    onDelete: 'CASCADE',
  })
  itinerary: ItineraryOrmEntity;
}
