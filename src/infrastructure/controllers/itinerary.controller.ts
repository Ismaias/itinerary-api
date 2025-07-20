import { Body, Controller, Get, Param, Post, HttpStatus } from '@nestjs/common';
import {
  CreateItineraryDto,
  CreateItineraryResponseDto,
  GetItinerarySummaryResponseDto,
  GetItineraryTicketsResponseDto,
} from '../dto/itinerary.dto';
import { Ticket } from 'src/domain/entities/ticket.entity';
import { CreateItineraryUseCase } from 'src/application/use-cases/create-itinerary.use-case';
import { GetItineraryTicketsUseCase } from 'src/application/use-cases/get-itinerary-tickets.use-case';
import { GetItinerarySummaryUseCase } from 'src/application/use-cases/get-itinerary-summary.use-case';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('itineraries')
@Controller('itineraries')
export class ItineraryController {
  constructor(
    private readonly createItinerary: CreateItineraryUseCase,
    private readonly getItineraryTickets: GetItineraryTicketsUseCase,
    private readonly getItinerarySummary: GetItinerarySummaryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new itinerary' })
  @ApiBody({ type: CreateItineraryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Itinerary created successfully',
    type: CreateItineraryResponseDto,
  })
  async create(
    @Body() dto: CreateItineraryDto,
  ): Promise<CreateItineraryResponseDto> {
    const tickets = dto.tickets.map(
      (t) => new Ticket(t.from, t.to, t.type, t.details),
    );
    const itinerary = await this.createItinerary.execute(tickets);
    return {
      itineraryId: itinerary.id,
    };
  }

  @Get(':id/tickets')
  @ApiOperation({ summary: 'Get all tickets for an itinerary' })
  @ApiParam({ name: 'id', description: 'Itinerary ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of tickets for the itinerary',
    type: GetItineraryTicketsResponseDto,
  })
  async getTickets(
    @Param('id') id: string,
  ): Promise<GetItineraryTicketsResponseDto> {
    const tickets = await this.getItineraryTickets.execute(id);
    return { tickets };
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get a human-readable summary of the itinerary' })
  @ApiParam({ name: 'id', description: 'Itinerary ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Human-readable summary of the itinerary',
    type: GetItinerarySummaryResponseDto,
  })
  async getSummary(
    @Param('id') id: string,
  ): Promise<GetItinerarySummaryResponseDto> {
    const summary = await this.getItinerarySummary.execute(id);
    return { summary };
  }
}
