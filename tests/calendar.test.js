import { describe, it, expect } from 'vitest';

// setup.js loads state/utils/animals. Calendar needs i18n, locations and its data.
await import('../data/i18n.js');
await import('../data/locations.js');
await import('../data/calendar.js');

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];

describe('calendar data', () => {
  it('every locale has 7 days and 12 months', () => {
    LOCALES.forEach((loc) => {
      expect(APP.CALENDAR.days[loc]).toHaveLength(7);
      expect(APP.CALENDAR.months[loc]).toHaveLength(12);
      APP.CALENDAR.days[loc].forEach((d) => expect(typeof d).toBe('string'));
      APP.CALENDAR.months[loc].forEach((m) => expect(typeof m).toBe('string'));
    });
  });

  it('weeks are Monday-first in English', () => {
    expect(APP.CALENDAR.days.en[0]).toBe('Monday');
    expect(APP.CALENDAR.days.en[6]).toBe('Sunday');
  });

  it('calendarList resolves the locale list and falls back to en', () => {
    expect(APP.calendarList('days', 'de')[0]).toBe('Montag');
    expect(APP.calendarList('months', 'fr')).toHaveLength(12);
    expect(APP.calendarList('days', 'zz')).toEqual(APP.CALENDAR.days.en); // unknown locale -> en
  });
});

describe('calendar wiring', () => {
  it('School hosts the calendar game', () => {
    const school = APP.LOCATIONS.find((l) => l.id === 'school');
    expect(school.games.map((g) => g.screen)).toContain('calendar');
    expect(APP.locationOf('calendar')).toBe('school');
  });
});

describe('calendar i18n completeness', () => {
  const keys = [
    'game.calendar.title', 'intro.calendar',
    'calendar.days', 'calendar.months',
    'calendar.daysPrompt', 'calendar.next',
    'calendar.daysWin', 'calendar.monthsWin',
  ];
  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every calendar key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = keys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});
