export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end?: string;
  location?: string;
}

export type ReminderStatus = 'none' | 'due' | 'acknowledged';

export interface SideNote {
  id: string;
  date: string;
  eventId?: string;
  anchorTime?: string;
  text: string;
  completed: boolean;
  reminder: ReminderStatus;
  updatedAt: string;
}

export interface AppData {
  version: 1;
  events: CalendarEvent[];
  notes: SideNote[];
}

export const EMPTY_DATA: AppData = { version: 1, events: [], notes: [] };

const unescapeIcs = (value: string) => value
  .replace(/\\n/gi, ' ')
  .replace(/\\,/g, ',')
  .replace(/\\;/g, ';')
  .replace(/\\\\/g, '\\')
  .trim();

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseIcsDate(raw: string, timeZone?: string): Date | null {
  const value = raw.trim();
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?(Z)?$/);
  if (!match) return null;
  const [, y, m, d, hh = '00', mm = '00', ss = '00', utc] = match;
  const parts = [Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss)] as const;
  let date = utc ? new Date(Date.UTC(...parts)) : new Date(...parts);
  if (!utc && timeZone) {
    try {
      const guess = Date.UTC(...parts);
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
      });
      const rendered = Object.fromEntries(formatter.formatToParts(new Date(guess)).map((part) => [part.type, part.value]));
      const renderedAsUtc = Date.UTC(Number(rendered.year), Number(rendered.month) - 1, Number(rendered.day), Number(rendered.hour), Number(rendered.minute), Number(rendered.second));
      date = new Date(guess - (renderedAsUtc - guess));
    } catch { /* An unknown TZID falls back to the device timezone. */ }
  }
  return Number.isNaN(date.valueOf()) ? null : date;
}

export function parseIcs(source: string): CalendarEvent[] {
  if (!/BEGIN:VCALENDAR/i.test(source)) throw new Error('This file is not an ICS calendar.');
  const unfolded = source.replace(/\r?\n[ \t]/g, '');
  const blocks = [...unfolded.matchAll(/BEGIN:VEVENT\r?\n([\s\S]*?)END:VEVENT/gi)];
  if (!blocks.length) throw new Error('No appointments were found in this calendar file.');

  const usedIds = new Set<string>();
  const events = blocks.flatMap((block, index): CalendarEvent[] => {
    const fields = new Map<string, string>();
    const zones = new Map<string, string>();
    for (const line of block[1].split(/\r?\n/)) {
      const divider = line.indexOf(':');
      if (divider < 0) continue;
      const property = line.slice(0, divider);
      const key = property.split(';')[0].toUpperCase();
      const zone = property.match(/(?:^|;)TZID=([^;:]+)/i)?.[1];
      if (!fields.has(key)) fields.set(key, line.slice(divider + 1));
      if (zone) zones.set(key, zone);
    }
    const start = parseIcsDate(fields.get('DTSTART') ?? '', zones.get('DTSTART'));
    if (!start) return [];
    const end = parseIcsDate(fields.get('DTEND') ?? '', zones.get('DTEND'));
    const baseUid = fields.get('UID')?.trim() || `event-${start.valueOf()}-${index}`;
    const recurrence = fields.get('RECURRENCE-ID')?.trim();
    let uid = recurrence ? `${baseUid}::${recurrence}` : baseUid;
    if (usedIds.has(uid)) uid = `${uid}::${start.toISOString()}`;
    usedIds.add(uid);
    return [{
      id: uid,
      summary: unescapeIcs(fields.get('SUMMARY') || 'Untitled appointment'),
      start: start.toISOString(),
      end: end?.toISOString(),
      location: fields.get('LOCATION') ? unescapeIcs(fields.get('LOCATION')!) : undefined,
    }];
  });
  if (!events.length) throw new Error('Appointments were found, but none had a readable start time.');
  return events.sort((a, b) => a.start.localeCompare(b.start));
}

export function eventDateKey(event: CalendarEvent): string {
  return localDateKey(new Date(event.start));
}

export function formatTime(iso?: string): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
}

export function formatDay(dateKey: string): string {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .format(new Date(`${dateKey}T12:00:00`));
}

export function dailyBrief(dateKey: string, data: AppData): string {
  const events = data.events.filter((event) => eventDateKey(event) === dateKey);
  const notes = data.notes.filter((note) => note.date === dateKey);
  const lines = [
    `BOOKING SIDE NOTES — ${formatDay(dateKey).toUpperCase()}`,
    'Operational context only. These notes do not block calendar availability.',
    '',
  ];
  if (!events.length) lines.push('APPOINTMENTS\nNo imported appointments.\n');
  else {
    lines.push('APPOINTMENTS');
    for (const event of events) {
      const time = `${formatTime(event.start)}${event.end ? `–${formatTime(event.end)}` : ''}`;
      lines.push(`${time}  ${event.summary}${event.location ? ` — ${event.location}` : ''}`);
    }
    lines.push('');
  }
  lines.push('SIDE NOTES');
  if (!notes.length) lines.push('No notes for this day.');
  for (const note of notes.sort((a, b) => (a.anchorTime || '').localeCompare(b.anchorTime || ''))) {
    const mark = note.completed ? '[x]' : '[ ]';
    const reminder = note.reminder === 'due' ? ' · REMINDER DUE' : note.reminder === 'acknowledged' ? ' · REMINDED' : '';
    const event = events.find((item) => item.id === note.eventId);
    lines.push(`${mark} ${note.anchorTime || 'Any time'}${event ? ` · ${event.summary}` : ''}${reminder}`);
    lines.push(`    ${note.text}`);
  }
  lines.push('', 'Made locally with Booking Side Notes. 0 minutes blocked by notes.');
  return lines.join('\n');
}

export function validateImport(value: unknown): AppData {
  if (!value || typeof value !== 'object') throw new Error('The backup is not a valid Booking Side Notes file.');
  const candidate = value as Partial<AppData>;
  if (candidate.version !== 1 || !Array.isArray(candidate.events) || !Array.isArray(candidate.notes)) {
    throw new Error('The backup format is not supported.');
  }
  const validEvents = candidate.events.every((event) => event && typeof event.id === 'string' && typeof event.summary === 'string' && typeof event.start === 'string');
  const validNotes = candidate.notes.every((note) => note && typeof note.id === 'string' && typeof note.date === 'string' && typeof note.text === 'string');
  if (!validEvents || !validNotes) throw new Error('The backup contains incomplete appointments or notes.');
  return candidate as AppData;
}
