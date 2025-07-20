import { InvalidItineraryException } from './invalid-itinerary.exception';

describe('InvalidItineraryException', () => {
  it('should format the message correctly', () => {
    const e = new InvalidItineraryException('test error');
    expect(e.message).toContain('Invalid itinerary: test error');
  });
});
