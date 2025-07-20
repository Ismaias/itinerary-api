import { ItineraryNotFoundException } from './itinerary-not-found.exception';

describe('ItineraryNotFoundException', () => {
  it('should format the message with the id', () => {
    const e = new ItineraryNotFoundException('123');
    expect(e.message).toContain("Itinerary with id '123' not found");
  });
});
