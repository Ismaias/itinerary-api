import { ApiProperty } from '@nestjs/swagger';
import { TicketDto } from './ticket.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';

export class CreateItineraryDto {
  @ApiProperty({ type: [TicketDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

export class CreateItineraryResponseDto {
  @ApiProperty()
  itineraryId: string | undefined;
}

export class GetItineraryTicketsResponseDto {
  @ApiProperty({ type: [TicketDto] })
  tickets: TicketDto[];
}

export class GetItinerarySummaryResponseDto {
  @ApiProperty({
    type: [String],
    description: 'Human-readable summary of the itinerary.',
  })
  summary: string[];
}
