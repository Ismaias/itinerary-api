import { NotFoundException } from '@nestjs/common';

export class ItineraryNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Itinerary with id '${id}' not found`);
  }
}
