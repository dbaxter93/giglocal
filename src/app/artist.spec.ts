import { Artist } from './artist';

describe('Artist', () => {
  it('should create an instance', () => {
    expect(new Artist(1, "David", "Taylor", "dtaylor", null, "Bass Trombone")).toBeTruthy();
  });
});
