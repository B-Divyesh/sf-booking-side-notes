import { describe, expect, it } from 'vitest';
import { dailyBrief, parseIcs, validateImport, type AppData } from '../src/domain';

const fixture = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
UID:booking-1\r
DTSTART:20260828T090000Z\r
DTEND:20260828T100000Z\r
SUMMARY:Boiler service\r
LOCATION:14 Market\\, Lane\r
END:VEVENT\r
BEGIN:VEVENT\r
UID:booking-2\r
DTSTART;VALUE=DATE:20260829\r
SUMMARY:All-day stock check\r
END:VEVENT\r
END:VCALENDAR`;

describe('ICS import', () => {
  it('keeps only the appointment fields needed by the product', () => {
    const events = parseIcs(fixture);
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({ id: 'booking-1', summary: 'Boiler service', location: '14 Market, Lane' });
    expect(Object.keys(events[0]).sort()).toEqual(['end', 'id', 'location', 'start', 'summary']);
  });

  it('reports non-calendar and empty calendar files clearly', () => {
    expect(() => parseIcs('not a calendar')).toThrow(/not an ICS calendar/i);
    expect(() => parseIcs('BEGIN:VCALENDAR\nEND:VCALENDAR')).toThrow(/No appointments/i);
  });
});

describe('portable data', () => {
  const data: AppData = {
    version: 1,
    events: [{ id: 'booking-1', summary: 'Boiler service', start: '2026-08-28T09:00:00.000Z' }],
    notes: [{ id: 'note-1', date: '2026-08-28', eventId: 'booking-1', anchorTime: '08:45', text: 'Call before arrival', completed: false, reminder: 'due', updatedAt: '2026-08-28T07:00:00.000Z' }],
  };

  it('builds a useful daily brief with a nonblocking reminder', () => {
    const brief = dailyBrief('2026-08-28', data);
    expect(brief).toContain('Boiler service');
    expect(brief).toContain('[ ] 08:45 · Boiler service · REMINDER DUE');
    expect(brief).toContain('0 minutes blocked by notes');
  });

  it('accepts its own backup format and rejects partial data', () => {
    expect(validateImport(data)).toEqual(data);
    expect(() => validateImport({ version: 1, events: [{}], notes: [] })).toThrow(/incomplete/i);
  });
});
