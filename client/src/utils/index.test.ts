import { formatTimeForInput } from '.';

describe('formatTimeForInput', () => {
  it('should format midnight correctly', () => {
    expect(formatTimeForInput('2023-01-01T00:00:00Z')).toBe('00:00');
  });

  it('should format noon correctly', () => {
    expect(formatTimeForInput('2023-01-01T12:00:00Z')).toBe('12:00');
  });

  it('should handle single-digit hours', () => {
    expect(formatTimeForInput('2023-01-01T09:30:00Z')).toBe('09:30');
  });

  it('should handle single-digit minutes', () => {
    expect(formatTimeForInput('2023-01-01T14:05:00Z')).toBe('14:05');
  });

  it('should format time close to midnight correctly', () => {
    expect(formatTimeForInput('2023-01-01T23:59:59Z')).toBe('23:59');
  });

  it('should handle different timezones', () => {
    const date = new Date('2023-01-01T15:30:00+05:00');
    expect(formatTimeForInput(date.toISOString())).toBe('10:30');
  });

  it('should handle daylight saving time changes', () => {
    const date = new Date('2023-03-12T02:30:00-05:00'); // During DST change
    expect(formatTimeForInput(date.toISOString())).toBe('07:30');
  });
});
