import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItineraryOrmEntity } from './itinerary.orm-entity';
import { Itinerary } from '../../domain/entities/itinerary.entity';
import { ItineraryMapper } from '../mappers/itinerary.mapper';
import { ItineraryRepositoryPort } from '../../application/ports/itinerary-repository.port';

@Injectable()
export class ItineraryRepository implements ItineraryRepositoryPort {
  constructor(
    @InjectRepository(ItineraryOrmEntity)
    private readonly repo: Repository<ItineraryOrmEntity>,
  ) {}

  async save(itinerary: Itinerary): Promise<Itinerary> {
    const ormEntity = ItineraryMapper.domainToOrm(itinerary);
    const saved = await this.repo.save(ormEntity);
    return ItineraryMapper.ormToDomain(saved);
  }

  async findById(id: string): Promise<Itinerary | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? ItineraryMapper.ormToDomain(found) : null;
  }
}
