import { Itinerary } from '../../domain/entities/itinerary.entity';

export interface ItineraryRepositoryPort {
  save(itinerary: Itinerary): Promise<Itinerary>;
  findById(id: string): Promise<Itinerary | null>;
}
