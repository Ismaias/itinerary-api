import {
  ApiProperty,
  ApiPropertyOptional,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { TicketType } from 'src/domain/entities/ticket-type.enum';

export class TicketDetailsDto {
  @ApiPropertyOptional({ description: 'Train number, if applicable.' })
  @IsOptional()
  @IsString()
  trainNumber?: string;

  @ApiPropertyOptional({ description: 'Platform number, if applicable.' })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiPropertyOptional({ description: 'Seat number, if applicable.' })
  @IsOptional()
  @IsString()
  seat?: string;

  @ApiPropertyOptional({ description: 'Tram number, if applicable.' })
  @IsOptional()
  @IsString()
  tramNumber?: string;

  @ApiPropertyOptional({ description: 'Flight number, if applicable.' })
  @IsOptional()
  @IsString()
  flightNumber?: string;

  @ApiPropertyOptional({ description: 'Gate number, if applicable.' })
  @IsOptional()
  @IsString()
  gate?: string;

  @ApiPropertyOptional({
    description: 'Luggage instructions or information, if applicable.',
  })
  @IsOptional()
  @IsString()
  luggage?: string;
}

@ApiExtraModels(TicketDetailsDto)
export class TicketDto {
  @ApiProperty({
    example: 'St. Anton am Arlberg Bahnhof',
    description: 'The departure location for this leg of the journey.',
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    example: 'Innsbruck Hbf',
    description: 'The arrival location for this leg of the journey.',
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: TicketType.TRAIN,
    enum: TicketType,
    description: 'Type of transit (e.g., train, flight, bus, tram, etc.)',
  })
  @IsEnum(TicketType)
  type: TicketType;

  @ApiProperty({
    type: TicketDetailsDto,
    description: 'Additional details specific to the type of transit.',
    required: false,
    example: {
      trainNumber: 'RJX 765',
      platform: '3',
      seat: '17C',
    },
  })
  @IsOptional()
  @IsObject()
  details?: TicketDetailsDto;
}
