import { BadRequestException } from '@nestjs/common';

export class InvalidItineraryException extends BadRequestException {
  constructor(message: string) {
    super(`Invalid itinerary: ${message}`);
  }
}
