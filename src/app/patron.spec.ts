import { Patron } from './patron';

describe('Patron', () => {
  it('should create an instance', () => {
    expect(new Patron(1, "Kenni", "Ther", null)).toBeTruthy();
  });
});
